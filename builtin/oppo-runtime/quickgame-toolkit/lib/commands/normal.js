"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function generate(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],t=arguments[2],a=_path2.default.resolve(t||process.cwd()),n=packer.checkProject(a,r),c=packer.mkDirs(a,r),u=getSubpacks(n);u&&u.length>0?(console.log(_chalk2.default.green("###包含分包### 开始打包")),generateWithSubpacks(e,a,c,n,r)):(console.log(_chalk2.default.green("###不包含分包### 开始打包")),generateNoSubpacks(e,a,c,n,r))}function collectSubpacks(e,r){var t={};return r.forEach(function(r){t[r.name]=packer.collectPackFiles(_path2.default.resolve(_path2.default.join(e,r.root)))}),t}function collectMainPacks(e,r){var t=[];return(0,_values2.default)(r).forEach(function(e){t=t.concat(e.all)}),packer.collectPackFiles(e,t)}function getSubpacks(e){return e.subpackages}var _values=require("babel-runtime/core-js/object/values"),_values2=_interopRequireDefault(_values),_getIterator2=require("babel-runtime/core-js/get-iterator"),_getIterator3=_interopRequireDefault(_getIterator2),_regenerator=require("babel-runtime/regenerator"),_regenerator2=_interopRequireDefault(_regenerator),_asyncToGenerator2=require("babel-runtime/helpers/asyncToGenerator"),_asyncToGenerator3=_interopRequireDefault(_asyncToGenerator2),generateNoSubpacks=function(){var e=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function e(r,t,a,n,c){return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,packer.buildDir(r,t,a.targetDir,!0,!1,[],{},c);case 2:return e.next=4,packer.signDir(null,a.targetDir,a.distDir,n,a.signFiles,c);case 4:_fsExtra2.default.removeSync(a.targetDir);case 5:case"end":return e.stop()}},e,this)}));return function(r,t,a,n,c){return e.apply(this,arguments)}}(),generateWithSubpacks=function(){var e=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function e(r,t,a,n,c){var u,i,o,l,s,p,f,_,g,d,k,h,v,b;return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return packer.checkSubpackageConf(t,n),u=collectSubpacks(t,n.subpackages),i=collectMainPacks(t,u),o=_path2.default.join(a.targetDir,CONFIG.MAIN_PACK_NAME),l=_path2.default.join(a.distDir,CONFIG.TMP_RPKS),e.next=7,packer.buildDir(r,t,o,!0,!0,packer.getExcludes(null,u,i,CONFIG.MAIN_PACK_NAME,"all"),{},c);case 7:return e.next=9,packer.signDir(CONFIG.MAIN_PACK_NAME,o,l,n,a.signFiles,!0);case 9:s={},p=!0,f=!1,_=void 0,e.prev=13,g=(0,_getIterator3.default)(n.subpackages);case 15:if(p=(d=g.next()).done){e.next=28;break}return k=d.value,h=_path2.default.resolve(_path2.default.join(a.targetDir,k.name)),v=_path2.default.resolve(_path2.default.join(t,k.root)),b=_path2.default.resolve(_path2.default.join(a.distDir,CONFIG.TMP_RPKS)),k.path=v,e.next=23,packer.buildDir(r,v,h,!1,!0,packer.getExcludes(k,u,i,k.name,"all"),s,c);case 23:return e.next=25,packer.signDir(k.name,h,b,n,a.signFiles,!0);case 25:p=!0,e.next=15;break;case 28:e.next=34;break;case 30:e.prev=30,e.t0=e.catch(13),f=!0,_=e.t0;case 34:e.prev=34,e.prev=35,!p&&g.return&&g.return();case 37:if(e.prev=37,!f){e.next=40;break}throw _;case 40:return e.finish(37);case 41:return e.finish(34);case 42:return e.next=44,packer.signDir(null,l,a.distDir,n,a.signFiles,c);case 44:_fsExtra2.default.removeSync(l),_fsExtra2.default.removeSync(a.targetDir);case 46:case"end":return e.stop()}},e,this,[[13,30,34,42],[35,,37,41]])}));return function(r,t,a,n,c){return e.apply(this,arguments)}}(),_path=require("path"),_path2=_interopRequireDefault(_path),_fsExtra=require("fs-extra"),_fsExtra2=_interopRequireDefault(_fsExtra),_chalk=require("chalk"),_chalk2=_interopRequireDefault(_chalk),_pack=require("../pack"),packer=_interopRequireWildcard(_pack),_config=require("../config/config"),CONFIG=_interopRequireWildcard(_config);module.exports=generate;