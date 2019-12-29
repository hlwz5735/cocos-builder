let JsZip = require("../lib/jszip.min.js");
let path = require('path');
let fs = require('fs-extra');

let workerUtil = require("./worker-util.js");
let adapterUtil = require("./adapter-util.js");
let tinyPackUtil = require("./tinypack-util.js");

let info = {};  // 打包信息
const MAIN_JS_NAME = "main.js";
const GAME_CONFIG_JSONS_NAME = "game.config.json";

/**
 * 把文件夹添加到压缩包
 * @param srcPath 文件夹路径
 * @param dirName 文件夹名称
 */
JsZip.prototype.directory = function (srcPath, dirName) {
    let stat = fs.statSync(srcPath);
    if (!stat.isDirectory()) {
        Editor.error(srcPath + " is not a folder!");
        return;
    }

    let list = fs.readdirSync(srcPath);
    list.forEach(function (name) {
        let zip = this.zip;
        let filePath = path.join(this.srcPath, name);
        let stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            zip.directory(filePath, name);
        } else if (stat.isFile()) {
            zip.file(name, fs.readFileSync(filePath));
        } else {
            Editor.error(filePath + " was not added to zip!");
        }
    }.bind({
        srcPath: srcPath,
        zip: this.folder(dirName)
    }))
};

/**
 *  把文件添加到压缩包
 * @param srcPath       文件路径
 * @param relativePath 压缩包中的相对路径
 */
JsZip.prototype.append = function (srcPath, relativePath) {
    let stat = fs.statSync(srcPath);
    if (!stat.isFile()) {
        Editor.error(srcPath + " is not a file!");
        return;
    }
    this.file(relativePath, fs.readFileSync(srcPath));
};

module.exports = {
    /**
     * 收集信息
     * @param options
     */
    async gatherInfo(options) {
        if (typeof Editor.Profile.load.getSelfData !== 'undefined') {
            info.customConfig = Editor.Profile.load('project://cpk-runtime.json').getSelfData();
        } else {
            info.customConfig = Editor.Profile.load('profile://project/cpk-publish.json').data;
        }
        let customConfig = info.customConfig;
        info.isTinyPackage = !!customConfig.tinyPackageMode;
        info.projectPath = options.project;                     // creator工程路径
        info.buildPath = options.dest;                          // 构建路径
        info.subpackages = options.buildResults._subpackages;   // 分包信息
        info.title = options.title;                             // 打包面板中的游戏名称
        info.cpkName = options.title + '.cpk';                  // cpk名称
        let outPutCpkPath = customConfig.outputCpkPath;
        let useCustomCpkPath = customConfig.useCustomCpkPath;
        info.buildResults = options.buildResults;
        info.startScene = options.startScene;

        if (useCustomCpkPath === true) {
            if (outPutCpkPath !== '' && fs.existsSync(outPutCpkPath)) {
                info.cpkPath = path.join(outPutCpkPath, info.cpkName);;
            }
            else {
                Editor.log(Editor.T('cpk-publish.out_cpk_path_error'));
                info.cpkPath = path.join(info.buildPath, info.cpkName); // cpk路径
            }
        } else {
            info.cpkPath = path.join(info.buildPath, info.cpkName); // cpk路径
        }
        // 游戏配置
        info.gameConfig = {
            "deviceOrientation": customConfig.deviceOrientation,
            "showStatusBar": customConfig.runtimeVersion,
            "runtimeVersion": customConfig.showStatusBar
        };
        info.JsZip = JsZip;
        info.cpk = new JsZip();

        await workerUtil.gatherInfo(info);        // worker收集信息
        await adapterUtil.gatherInfo(info);       // jsb-adapter收集信息
        await tinyPackUtil.gatherInfo(info);        //小包模式
    },
    /**
     * 整理资源
     */
    async organizeResources() {
        let buildPath = info.buildPath;

        await workerUtil.organizeResources();       // worker整理资源
        await adapterUtil.organizeResources();      // jsb-adapter整理资源

        // 写游戏配置json
        fs.writeFileSync(path.join(buildPath, GAME_CONFIG_JSONS_NAME), JSON.stringify(info.gameConfig));
        //设置横屏
        this.handleDeviceOrientation();
    },

    handleDeviceOrientation() {
        if (info.customConfig.deviceOrientation !== 'landscape') {
            return;
        }

        var fileMain = path.join(info.buildPath, MAIN_JS_NAME);
        var mainString = fs.readFileSync(fileMain, "utf8");
        var indexString = "require('jsb-adapter/engine/index.js');";
        var index = mainString.indexOf(indexString) + indexString.length;
        mainString = mainString.slice(0, index) + "\n\t\tloadRuntime().callCustomCommand(null, 'setOrientation', '{\"orientation\":0}');" + mainString.slice(index);
        fs.writeFileSync(fileMain, mainString);
    },
    /**
     * 打包
     */
    async pack() {
        let cpk = info.cpk;
        let cpkPath = info.cpkPath;
        let buildPath = info.buildPath;

        if (fs.existsSync(cpkPath)) {
            // 清理旧包
            fs.unlinkSync(cpkPath);
        }

        // ----打包开始----
        let writeStream = fs.createWriteStream(cpkPath);

        await workerUtil.pack();      // worker打包处理
        await adapterUtil.pack();     // jsb-adapter打包处理
        await tinyPackUtil.pack();  // 小包处理

        cpk.directory(path.join(buildPath, "src"), "src");  // 添加src文件夹到cpk
        cpk.append(path.join(buildPath, MAIN_JS_NAME), MAIN_JS_NAME);    // 添加main.js文件到cpk
        cpk.append(path.join(buildPath, GAME_CONFIG_JSONS_NAME), GAME_CONFIG_JSONS_NAME);    // 添加game.comfig.json文件到cpk

        cpk.generateNodeStream({ type: "nodebuffer", base64: false, compression: 'DEFLATE' })
            .pipe(writeStream)
            .on('finish', function () {
                tinyPackUtil.packFinished();
            });
    }
};