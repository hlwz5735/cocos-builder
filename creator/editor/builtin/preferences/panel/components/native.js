"use strict";const e=require("electron"),t=e.remote.dialog,i=require("fire-fs");exports.template=i.readFileSync(Editor.url("packages://preferences/panel/template/native.html"),"utf-8"),exports.props=["native"],exports.data=function(){return{dev:Editor.dev}},exports.methods={T:Editor.T,_onUseDefaultCppEngineChanged(e){let t=e.target.value;if(0===this.askUpdateSimulatorConfig())return e.target.checked=!t,void 0;this.native.useDefaultCppEngine=t},_onJavaScriptEngineChanged(e){Editor.warn(Editor.T("PREFERENCES.native.js_engine_changed_info"))},async choosePath(e){let i=await function(e){return e=e||Editor.Project.path,new Promise(i=>{let a={defaultPath:e,properties:["openDirectory"]};"darwin"===process.platform&&(a.properties.push("openFile"),a.properties.push("treatPackageAsDirectory"),a.filters=[{name:"Application",extensions:["app"]}]),t.showOpenDialog(a,e=>{Array.isArray(e)&&(e=e[0]),i(e)})})}(this.native[e]);if(i){if("cppEnginePath"===e){if(0===this.askUpdateSimulatorConfig())return}else"jsEnginePath"===e&&this._onJavaScriptEngineChanged();this.native[e]=i}},openPath(t){let a=this.native[t];i.existsSync(a)||(Editor.warn(`Folder does not exist: ${a}`),a=Editor.appPath),e.shell.showItemInFolder(a),e.shell.beep()},askUpdateSimulatorConfig:()=>Editor.Dialog.messageBox({type:"question",buttons:[Editor.T("MESSAGE.cancel"),Editor.T("PREFERENCES.native.confirm_and_update")],title:"Need update simulator config",message:Editor.T("PREFERENCES.native.need_update_simulator"),detail:"",defaultId:1,cancelId:0,noLink:!0})},exports.created=function(){};