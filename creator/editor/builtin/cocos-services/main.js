"use strict";function e(e,r){Editor.require("packages://cocos-services/panel/utils/ccServices.js").execInstallNativePlatformScript(e,e=>{e&&r()})}async function r(e=!1){let r=Editor.require("packages://cocos-services/panel/utils/ccServices.js");await r.init(),!e&&Editor.info("Cocos Services load base data!")}function o(){r(!0),Editor.info("Cocos Services reload base data!")}function i(){r(!0)}module.exports={load(){r(),Editor.Builder.removeListener("before-change-files",e),Editor.Builder.on("before-change-files",e),Editor.User.removeListener("login",o),Editor.User.removeListener("logout",i),Editor.User.on("login",o),Editor.User.on("logout",i)},unload(){Editor.Builder.removeListener("before-change-files",e),Editor.User.removeListener("login",o),Editor.User.removeListener("logout",i)},messages:{log(e,r){Editor.log(r)},error(e,r){Editor.error(r)},info(e,r){Editor.info(r)},warnning(e,r){Editor.warn(r)},success(e,r){Editor.success(r)},failed(e,r){Editor.failed(r)},open(e,r){Editor.Panel.open("cocos-services")},execH5Script(e,r){Editor.require("packages://cocos-services/panel/utils/ccServices.js").execInstallH5PlatformScript(r.service,r.params,r.enable)}}};