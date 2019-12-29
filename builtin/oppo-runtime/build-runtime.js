var GAME_CONFIG_JSONS_NAME = "manifest.json";
var path = require('path');
var fs = require('fire-fs');
var exec = require('child_process').exec;
var fixPath = require('fix-path');

var zipRootPath;
let RUNTIME_CONFIG;
var tempTinyResDir;

var SIGN_NAME = "sign";
var LOGO_PNG = "logo.png";
var MAIN_JS = "main.js";

// 导出的快游戏根目录
var dirTarget;
// cp配置的应用图标路径
var iconPath;
var subPackageGroup;

var privatePemPath;
var certificatePemPath;
var useDebugKey;
var sendStatisticsDebug;
var sendStatisticsSourceMaps;
var environmentPath = {};
var isFixPath = false;
var showNpmPath;
var isWindowsPlatform = process.platform === 'win32';


// 获取资源文件
function getResPath(name) {
    var resPath = path.join(__dirname, "res");
    return path.join(resPath, name);
}

function getPackPath() {
    return Editor.url("packages://oppo-runtime/quickgame-toolkit");
}

function getQuickgameIndex() {
    return path.join(Editor.url("packages://oppo-runtime/quickgame-toolkit/lib/bin"), "index");
}

function writeConfigFile(options) {
    var projectCgfFile = path.join(dirTarget, GAME_CONFIG_JSONS_NAME);
    var package = RUNTIME_CONFIG.package;
    var name = RUNTIME_CONFIG.name;
    var versionName = RUNTIME_CONFIG.versionName;
    var versionCode = RUNTIME_CONFIG.versionCode;
    var minPlatformVersion = RUNTIME_CONFIG.minPlatformVersion;
    var deviceOrientation = RUNTIME_CONFIG.deviceOrientation;
    var features = [{
        "name": "system.prompt"
    },
    {
        "name": "system.router"
    },
    {
        "name": "system.shortcut"
    }
    ];
    var permissions = [{
        "origin": "*"
    }];
    var jsonObj = {
        "package": package,
        "name": name,
        "versionName": versionName,
        "versionCode": versionCode,
        "minPlatformVersion": minPlatformVersion,
        "icon": "/logo.png",
        "features": features,
        "permissions": permissions,
        "orientation": deviceOrientation,
    };

    if (subPackageGroup) {
        jsonObj.subpackages = subPackageGroup;
    }
    var jsonStr = JSON.stringify(jsonObj);
    fs.writeFileSync(projectCgfFile, jsonStr);
}

// 处理debug模式的签名
function handleSign() {
    // jsb-link的sign目录
    var signTarget = path.join(dirTarget, SIGN_NAME);
    // 清空
    fs.emptyDirSync(signTarget);
    if (!useDebugKey) {
        var releasePath = path.join(signTarget, "release");
        fs.ensureDirSync(releasePath);
        //拷贝填写路径的 private.pem和certificate.pemwen
        if (fs.existsSync(privatePemPath)) {
            fs.writeFileSync(path.join(releasePath, "private.pem"), fs.readFileSync(privatePemPath));
        }
        if (fs.existsSync(certificatePemPath)) {
            fs.writeFileSync(path.join(releasePath, "certificate.pem"), fs.readFileSync(certificatePemPath));
        }
    }
}


function onBeforeBuildFinish(event, options) {
    Editor.log('Checking config file ' + options.dest);
    kitPath = getPackPath();
    // 导出的游戏过程目录路径
    tempTinyResDir = path.resolve(options.dest, '..', `tempTinyRes`);
    dirTarget = options.dest;

    zipRootPath = options.dest;

    //覆盖quickgame目录下jsb-adapter
    handleJsbAdapter(dirTarget);
    subPackageGroup = getSubPackageData(options);

    handleMainJs();
    // handleSrc();
    handleRes();

    // 添加应用图标
    handleLogo();
    // 导出 sign 目录
    handleSign();
    //小包模式:覆盖quickgame目录下的jsb-adapter的文件
    handleTinyPackage(options, dirTarget);
    // 将配置信息写入manifest.json
    writeConfigFile(options);

    //判断自定义npm路径
    if (RUNTIME_CONFIG.npmPath) {
        isFixPath = false;
        Editor.log(Editor.T('oppo-runtime.custom_npm_path_config'), RUNTIME_CONFIG.npmPath);
        environmentPath['Path'] = RUNTIME_CONFIG.npmPath;
    }
    else {
        if (showNpmPath) {
            Editor.log(Editor.T('oppo-runtime.custom_npm_path_not_config'));
        }
        if (!isFixPath) {
            isFixPath = true;
            fixPath();
        }
        environmentPath = process.env;
    }

    gulpTask();
    async function gulpTask() {
        let jsbAdapterBuild = require('./build-jsb-adapter');
        await jsbAdapterBuild.build({
            rootPath: path.join(zipRootPath, 'jsb-adapter'),
            dstPath: path.join(zipRootPath, 'jsb-adapter'),
            excludedModules: []
        });
        handleRpk(event);
    }

    function handleRpk(event) {
        var enginePath = path.join(zipRootPath, "jsb-adapter", 'engine');
        if (fs.existsSync(enginePath)) {
            fs.removeSync(enginePath);
        }
        if (!isSubPackMode()) {
            buildRpk(event);
            return;
        }
        //分包模式处理
        Editor.log(Editor.T('oppo-runtime.building_subpack_rpk'));
        var dirSubPackage = path.join(zipRootPath, 'subpackages');
        if (fs.existsSync(dirSubPackage)) {
            //修改game.js为main.js
            for (var Key in subPackageGroup) {
                var gameJsDir = path.join(dirTarget, subPackageGroup[Key].root, 'index.js');
                var mainJsDir = path.join(dirTarget, subPackageGroup[Key].root, 'main.js');
                if (fs.existsSync(gameJsDir)) {
                    fs.renameSync(gameJsDir, mainJsDir);
                }
            }
        }

        buildSubPackage(event, exec);
    }

    /***
     * 小包模式：
     *  1.jsb-adapter/engine添加rt-adapter.js;
     * 2.index.js引用rt-adapter.js
     * 3.修改rt-adapter.js的http赋值
     */
    function handleTinyPackage(options, dir) {
        var isTinyPackage = RUNTIME_CONFIG.tinyPackageMode;
        if (isTinyPackage === false) {
            return;
        }
        var remoteServer = RUNTIME_CONFIG.tinyPackageServer;
        if (remoteServer === '') {
            event.reply(new Error("please enter remote server root"));
            return;
        }
        // 将 rt-adapter.js 文件添加到 engine 目录中
        var dirJsbAdapter = path.join(dir, 'jsb-adapter');
        var rtAdapterTarget = path.join(dirJsbAdapter, 'engine/rt-adapter.js');
        var rtAdapterPath = getResPath('rt-adapter.js');
        var rtAdapterStr = fs.readFileSync(rtAdapterPath, "utf8");
        if (!fs.existsSync(dirJsbAdapter)) {
            fs.mkdirSync(dirJsbAdapter);
        }
        if (!fs.existsSync(path.join(dirJsbAdapter, 'engine'))) {
            fs.mkdirSync(path.join(dirJsbAdapter, 'engine'));
        }
        rtAdapterStr = rtAdapterStr.replace('REMOTE_SERVER_ROOT_PLACE_HOLDER', remoteServer);
        fs.writeFileSync(rtAdapterTarget, rtAdapterStr);
        // 为 index.js 文件添加引入 rt-adapter.js
        var jsbAdapterIndexPath = path.join(getResPath('jsb-adapter'), "engine/index.js");
        var indexStr = fs.readFileSync(jsbAdapterIndexPath, "utf8");
        if (indexStr.indexOf("require(\'.\/rt-adapter.js\');") == -1) {
            indexStr += "require(\'.\/rt-adapter.js\');";
        }
        var indexPath = path.join(dirJsbAdapter, "engine/index.js");

        fs.writeFileSync(indexPath, indexStr);
        //首包资源复制到编译环境
        if (RUNTIME_CONFIG.packFirstScreenRes === true) {
            moveFirstScreenToGamePack(options);
        }
    }
}

function moveFirstScreenToGamePack(options) {
    let buildResults = options.buildResults;
    var depends = buildResults.getDependencies(options.startScene);
    //复制res/import目录到编译环境
    var tempImport = path.join(tempTinyResDir, 'res', 'import');
    fs.copySync(tempImport, path.join(options.dest, 'res', 'import'));
    fs.removeSync(tempImport);
    ///复制res/raw-assets目录到编译环境
    for (var i = 0; i < depends.length; ++i) {
        var uuid = depends[i];
        // 获得构建后的原生资源路径（原生资源有图片、音频等，如果不是原生资源将返回空）
        var nativePath = buildResults.getNativeAssetPath(uuid);
        if (!nativePath || nativePath.length === 0) {
            continue;
        }
        let engineRes = path.join(options.dest, nativePath.replace(options.dest, ""));
        let tempRes = path.join(tempTinyResDir, nativePath.replace(options.dest, ""));
        fs.copySync(tempRes, engineRes);
        fs.removeSync(tempRes);
    }
}

// 构建rpk包
function buildRpk(event) {
    var quickgameCmd = 'node ' + getQuickgameIndex();
    Editor.log(Editor.T('oppo-runtime.rpk_installing'));
    //defalut debug cmd
    var cmcExec = `${quickgameCmd}  cocoscreator`;
    //release cmd
    cmcExec += !useDebugKey ? ' release' : '';
    //tiny cmd
    cmcExec += RUNTIME_CONFIG.tinyPackageMode ? '  --small-pack' : '';
    exec(`${cmcExec}`, {
        env: environmentPath,
        cwd: dirTarget
    }, (error, stdout, stderr) => {
        if (error) {
            // 判断node 未安装
            if (stderr.indexOf("'node' ") !== -1 || stderr.indexOf("node: command not found") !== -1) {
                if (RUNTIME_CONFIG.npmPath) {
                    event.reply(new Error(Editor.T('oppo-runtime.custom_npm_path_config_error')));
                    return;
                }
                Editor.Ipc.sendToWins('builder:events', 'npmPath-show');
                var msg = isWindowsPlatform ? Editor.T('oppo-runtime.not_install_nodejs_windows_error') : Editor.T('oppo-runtime.not_install_nodejs_mac_error');
                event.reply(new Error(msg));
                return;
            }
            event.reply(new Error(Editor.T('oppo-runtime.rpk_install_fail') + error));
            return;
        }
        var rpkfile = path.join(dirTarget, 'dist', RUNTIME_CONFIG.package + (!useDebugKey ? '.signed.' : '.') + 'rpk');
        Editor.log(Editor.T('oppo-runtime.rpk_install_success') + rpkfile);
        copyResTiny();
        event.reply();
        sendStatistics();
    });
}


// 构建分包rpk
function buildSubPackage(event) {
    var quickgameCmd = 'node ' + getQuickgameIndex();
    var execCmd = `${quickgameCmd} subpack --no-build-js`;
    //release 模式
    if (!useDebugKey) {
        execCmd += ' release';
    }

    exec(`${execCmd}`, {
        env: environmentPath,
        cwd: dirTarget
    }, (error, stdout, stderr) => {
        //删除subpackages分包目录
        // deleteSubPackagesDir();
        if (error) {
            // node 未安装
            if (stderr.indexOf("'node' ") !== -1 || stderr.indexOf("node: command not found") !== -1) {
                if (RUNTIME_CONFIG.npmPath) {
                    event.reply(new Error(Editor.T('oppo-runtime.custom_npm_path_config_error')));
                    return;
                }
                Editor.Ipc.sendToWins('builder:events', 'npmPath-show');
                var msg = isWindowsPlatform ? Editor.T('oppo-runtime.not_install_nodejs_windows_error') : Editor.T('oppo-runtime.not_install_nodejs_mac_error');
                event.reply(new Error(msg));
                return;
            }
            event.reply(new Error(Editor.T('oppo-runtime.build_subpack_rpk_error') + error));
            return;
        }

        var rpkfile = path.join(dirTarget, 'dist', RUNTIME_CONFIG.package + (!useDebugKey ? '.signed.' : '.') + 'rpk');
        Editor.log(Editor.T('oppo-runtime.build_subpack_rpk_complet') + rpkfile);
        copyResTiny();
        event.reply();
        sendStatistics();
    })
}

function copyResTiny() {
    var dirRes = path.join(tempTinyResDir, 'res');
    var resPath = path.join(dirTarget, 'res');
    var isTinyPackage = RUNTIME_CONFIG.tinyPackageMode;
    if (isTinyPackage && fs.existsSync(tempTinyResDir)) {
        fs.copySync(dirRes, resPath);
    }
    if (fs.existsSync(tempTinyResDir)) {
        fs.removeSync(tempTinyResDir);
    }
}

function handleJsbAdapter(dir) {
    var rtAdapterPath = getResPath('jsb-adapter');
    var dirJsbAdapter = path.join(dir, 'jsb-adapter');
    if (fs.existsSync(dirJsbAdapter)) {
        fs.removeSync(dirJsbAdapter);
    }
    fs.copySync(rtAdapterPath, dirJsbAdapter);
}

function handleLogo() {
    fs.writeFileSync(path.join(dirTarget, LOGO_PNG), fs.readFileSync(iconPath));
}

function handleMainJs() {
    var fileMain = path.join(zipRootPath, MAIN_JS);
    var mainString = fs.readFileSync(fileMain, "utf8");
    mainString = mainString.replace("require('jsb-adapter/engine/index.js');", "require('jsb-adapter/jsb-engine.js');");
    fs.writeFileSync(path.join(dirTarget, MAIN_JS), mainString);
}

function handleRes() {
    if (!RUNTIME_CONFIG.tinyPackageMode) {
        return;
    }
    var dirRes = path.join(zipRootPath, 'res');
    var resPath = path.join(tempTinyResDir, 'res');
    if (fs.existsSync(resPath)) {
        fs.removeSync(resPath);
    }
    fs.copySync(dirRes, resPath);
    try {
        fs.removeSync(dirRes);
    } catch (error) {
        fs.emptyDirSync(dirRes);
    }

}

//settings.js从获取分包数据
function getSubPackageData(options) {
    subPackageJson = options.buildResults._subpackages;
    var packageSub;
    if (JSON.stringify(subPackageJson) == "{}") {
        packageSub = undefined;
    } else {
        packageSub = [];
        for (var Key in subPackageJson) {
            var filePath = subPackageJson[Key].path;
            var fileExt = path.extname(filePath);
            var name = path.basename(filePath, fileExt);
            var subObj = {
                "name": name,
                "root": "subpackages/" + name + "/"
            }
            packageSub.push(subObj);
        }
    }
    return packageSub;
}

var subPackageJson;

function isSubPackMode() {
    if (JSON.stringify(subPackageJson) == "{}") {
        return false;
    }
    return true;
}

//先读取runtime相应的配置信息
function loadRuntimeSettings(event, options) {
    var value;
    if (typeof Editor.Profile.load.getSelfData !== 'undefined') {
        value = Editor.Profile.load('project://oppo-runtime.json');
        RUNTIME_CONFIG = value.getSelfData();
    } else {
        value = Editor.Profile.load('profile://project/oppo-runtime.json');
        RUNTIME_CONFIG = value.data;
    }
    var package = RUNTIME_CONFIG.package;
    var name = RUNTIME_CONFIG.name;
    var versionName = RUNTIME_CONFIG.versionName;
    var versionCode = RUNTIME_CONFIG.versionCode;
    var minPlatformVersion = RUNTIME_CONFIG.minPlatformVersion;

    showNpmPath = RUNTIME_CONFIG.showNpmPath;
    privatePemPath = RUNTIME_CONFIG.privatePath;
    certificatePemPath = RUNTIME_CONFIG.certificatePath;
    useDebugKey = RUNTIME_CONFIG.useDebugKey;
    iconPath = RUNTIME_CONFIG.icon;

    sendStatisticsDebug = options.debug;
    sendStatisticsSourceMaps = options.sourceMaps;

    var configList = [{
        name: Editor.T('oppo-runtime.package'),
        value: package
    }, {
        name: Editor.T('oppo-runtime.name'),
        value: name
    }, {
        name: Editor.T('oppo-runtime.desktop_icon'),
        value: iconPath
    }, {
        name: Editor.T('oppo-runtime.version_name'),
        value: versionName
    }, {
        name: Editor.T('oppo-runtime.version_number'),
        value: versionCode
    }, {
        name: Editor.T('oppo-runtime.support_min_platform'),
        value: minPlatformVersion
    }];

    // 配置字段校验
    var validator = true;
    var nameList = [];
    var errorText = '';
    configList.forEach(function (item) {
        if (!item.value) {
            validator = false;
            nameList.push(item.name);
        }
    });
    if (!validator) {
        errorText += nameList.join('、') + Editor.T('oppo-runtime.not_empty');
    }

    if (iconPath) {
        if (!fs.existsSync(iconPath)) {
            validator = false;
            errorText += iconPath + Editor.T('oppo-runtime.icon_not_exist');
        }
    }

    //不勾选调试秘钥库
    if (!useDebugKey) {
        if (privatePemPath === "") {
            validator = false;
            errorText += Editor.T('oppo-runtime.private_pem_path_error');
        } else if (!fs.existsSync(privatePemPath)) {
            validator = false;
            errorText += `${privatePemPath}` + Editor.T('oppo-runtime.signature_not_exist');;
        }

        if (certificatePemPath === "") {
            validator = false;
            errorText += Editor.T('oppo-runtime.certificate_pem_path_error');
        } else if (!fs.existsSync(certificatePemPath)) {
            validator = false;
            errorText += `${certificatePemPath}` + Editor.T('oppo-runtime.signature_not_exist');
        }
    }


    //包名合法性判断
    var pat = /^[a-zA-Z]+[0-9a-zA-Z_]*(\.[a-zA-Z]+[0-9a-zA-Z_]*)*$/;
    if (!package.match(pat)) {
        validator = false;
        errorText += Editor.T('oppo-runtime.package_name_error');
    }


    if (!validator) {
        event.reply(new Error(errorText));
        return;
    }
    onBeforeBuildFinish(event, options);
}

function sendStatistics() {
    if (RUNTIME_CONFIG.useDebugKey ||
        RUNTIME_CONFIG.package.indexOf("test") ||
        RUNTIME_CONFIG.name.indexOf("test") ||
        sendStatisticsDebug ||
        sendStatisticsSourceMaps
    ) {
        return;
    }
    Editor.Metrics.trackEvent('Project', 'BetaPlatforms', 'oppo-runtime',
        {
            packageName: RUNTIME_CONFIG.package,//包名
            appName: RUNTIME_CONFIG.name,// 应用名字
            version: RUNTIME_CONFIG.versionName,//应用版本
            orientation: RUNTIME_CONFIG.deviceOrientation//屏幕方向
        }
    );
}

function loadRuntimeBefore(event, options) {
    if (fs.existsSync(options.dest)) {
        //清空目录
        fs.emptyDirSync(options.dest);
    }
    event.reply();
}


module.exports = {
    name: Editor.T('oppo-runtime.platform_name'),
    platform: 'quickgame',
    extends: 'runtime',
    buttons: [
        Editor.Builder.DefaultButtons.Build,
        { label: Editor.T('BUILDER.play'), message: 'play' },
    ],
    messages: {
        'build-start': loadRuntimeBefore,
        'build-finished': loadRuntimeSettings,
    },
    settings: Editor.url('packages://oppo-runtime/build-runtime-ui.js')
};