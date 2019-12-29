var e=require("lodash");const t=require("../utils/node"),n=require("../utils/scene");var r=cc.js,o=cc.Object,a=cc.Object.Flags,i=Editor.require("unpack://engine-dev/cocos2d/core/platform/CCClass").getDefault;let c={number:"Float",string:"String",boolean:"Boolean",object:"Object"};function s(e){return"object"==typeof e&&(e=e.constructor),r._getClassId(e)}function l(e,t,n){var r,o=n.ctor;if(o){if(r=s(o),t.type=r,!e[r]){var a=cc.js.isChildClassOf(o,cc.RawAsset),c=cc.js.isChildClassOf(o,cc.Node);a||c?f(e,o,r):p(e,o,r)}}else n.type&&(t.type=n.type);if(n.readonly&&(t.readonly=n.readonly),"default"in n){if(t.default=i(n.default),n.saveUrlAsAsset&&""===t.default)t.default=null;else if(null!=t.default&&!t.type&&(r={number:"Float",string:"String",boolean:"Boolean",object:"Object"}[typeof t.default]))if("Object"!==r||t.default.constructor===Object)t.type=r;else{var l=cc.js._getClassId(t.default.constructor);l&&(t.type=l)}}else n.hasSetter||(t.readonly=!0);"boolean"==typeof n.visible&&(t.visible=n.visible),n.enumList&&(t.enumList=JSON.parse(JSON.stringify(n.enumList))),n.hasOwnProperty("displayName")&&(t.displayName=Editor.i18n.format(n.displayName)),n.hasOwnProperty("multiline")&&(t.multiline=n.multiline),n.hasOwnProperty("min")&&(t.min=n.min),n.hasOwnProperty("max")&&(t.max=n.max),n.hasOwnProperty("step")&&(t.step=n.step),n.slide&&(t.slide=n.slide),n.nullable&&(t.nullable=n.nullable),n.tooltip&&(t.tooltip=Editor.i18n.format(n.tooltip)),n.hasOwnProperty("animatable")&&(t.animatable=n.animatable)}function u(e){return cc.Class.getInheritanceChain(e).map(e=>s(e)).filter(e=>e)}function p(e,t,r){var o;if("object"==typeof t){if(cc.Enum.isEnum(t))return cc.Enum.getList(t);o=t.constructor}else o=t;var a={};if(e[r]=a,o){a.name=cc.js.getClassName(o),a.name.startsWith("cc.")&&(a.name=a.name.slice(3));var i=u(o);i.length>0&&(a.extends=i);var c=o.__props__;if(c){for(var s={},p=0;p<c.length;p++){var f=c[p],d={},y=cc.Class.attr(t,f);y&&l(e,d,y),s[f]=d}n.isAnyChildClassOf(o,cc._BaseNode,cc.Component)&&(s._id={type:cc.String,visible:!1}),a.properties=s}}return a}function f(e,t,n){var r={},o=u(t);o.length>0&&(r.extends=o),e[n]=r}function d(e,t,n){var r=s(t);if(r){var o=e[r];if(o)return o.properties[n].type}return null}function y(e,t,n){if(!t)return{type:"Object",value:null};var r,a=t.constructor;if(t instanceof o){if(t instanceof cc.Asset){var i=t._uuid;return n!==(r=s(t))?(e[r]||p(e,a,r),{type:r,value:{uuid:i}}):{type:n,value:{uuid:i}}}if(cc.Node.isNode(t)||t instanceof cc.Component)return function(e,t,n){var r={value:{name:t.isValid?t.name:void 0,uuid:t.uuid}},o=s(t);return n!==o?(e[o]||p(e,t.constructor,o),r.type=o):r.type=n,r}(e,t,n)}else if(t instanceof cc.ValueType){var c=Editor.serialize(t,{stringify:!1});e[c.__type__]||f(e,a,c.__type__);var l=c.__type__;return delete c.__type__,{type:l,value:c}}if(cc.Class._isCCClass(a)){var u={};return n!==(r=s(t))?(e[r]||p(e,a,r),u.type=r):u.type=n,h(e,u,t,a),u}return{type:"Object",value:null}}function v(e,t){try{return t.call(e)}catch(e){Editor.error(e)}return v.ERRORED}function _(e,t,r,o,a){var i=d(e,r,o);if(a.saveUrlAsAsset){var s=a.ctor;if("function"==typeof s&&cc.js.isChildClassOf(s,cc.RawAsset)&&"string"==typeof t)return{type:i,value:{uuid:t&&Editor.Utils.UuidCache.urlToUuid(t)||""}}}if("object"==typeof t||void 0===t){var l=y(e,t,i);if(!l.value){if(!a.ctor)return{type:"Object",value:null};var u=a.ctor;if(n.isAnyChildClassOf(u,cc.Node,cc.RawAsset,cc.Component))return{type:i,value:{uuid:""}}}return l}if("function"==typeof t)return null;var p=c[typeof t];return"Enum"===i&&"number"==typeof t&&(p="Enum"),"Integer"!==i&&"Float"!==i||"Float"===p&&(p=i),{type:p,value:t}}function m(t,n,r,o,a){var c,s=d(t,r,o),l=cc.Class.attr(r,o);if(c=Array.isArray(n)?{type:s,value:e.map(n,function(e){return _(t,e,r,o,l)})}:null==n&&Array.isArray(i(l.default))?{type:"Object",value:null}:_(t,n,r,o,l),"function"==typeof l.visible){var u=v(a,l.visible);u!==v.ERRORED&&(c.visible=!!u)}return c}function h(e,t,n,r){var o=r.__props__;if(o){for(var a={},i=0;i<o.length;i++){var c=o[i],s=n[c];a[c]=m(e,s,r,c,n)}t.value=a}}v.ERRORED={},module.exports=function(e){if(!e)return{types:{},value:null};var n={};return{types:n,value:function(e,n){var r,o,i=["name","opacity","active","angle","group","is3DNode"],c=i.concat(["position","color"]),f={},d=s(n);if(d){f.__type__=d;var v={name:"Node",extends:u(cc.Node)};e[d]=v;var _={};for(r=0;r<c.length;r++){o=c[r];var b={},g=cc.Class.attr(cc.Node,o);g&&l(e,b,g),_[o]=b}_.angle.readonly=t._hasFlagInComponents(n,a.IsRotationLocked),_.position.readonly=t._hasFlagInComponents(n,a.IsPositionLocked),_.anchor={readonly:t._hasFlagInComponents(n,a.IsAnchorLocked)},p(e,cc.Vec2,"cc.Vec2"),p(e,cc.Vec3,"cc.Vec3"),_.size={readonly:t._hasFlagInComponents(n,a.IsSizeLocked)},p(e,cc.Size,"cc.Size"),_.scale={readonly:t._hasFlagInComponents(n,a.IsScaleLocked)},_.skew={},p(e,cc.Color,"cc.Color"),v.properties=_}for(r=0;r<i.length;r++)f[o=i[r]]=m(e,n[o],cc.Node,o,n);if(f.uuid=n.uuid,f.anchor=y(e,new cc.Vec2(n.anchorX,n.anchorY)),f.size=y(e,new cc.Size(n.width,n.height)),f.skew=y(e,new cc.Vec2(n.skewX,n.skewY)),f.color=y(e,n.color.setA(n.opacity)),f.eulerAngles=y(e,n.eulerAngles),n.is3DNode?(f.position=y(e,n.getPosition(cc.v3())),f.scale=y(e,n.getScale(cc.v3()))):(f.position=y(e,n.getPosition(cc.v2())),f.scale=y(e,n.getScale(cc.v2()))),n._prefab){let e=n._prefab.root,t=e&&e._prefab.asset;f.__prefab__={uuid:t&&t._uuid,rootName:e&&e.name,rootUuid:e&&e.uuid,sync:e&&e._prefab.sync,assetReadonly:t&&t.readonly}}var C=n._components;if(C){f.__comps__=[];for(var O=0;O<C.length;O++){var j=C[O],w=j.constructor;if(d=s(w)){var A=p(e,j,d),E="function"==typeof j.start||"function"==typeof j.update||"function"==typeof j.lateUpdate||"function"==typeof j.onEnable||"function"==typeof j.onDisable;A.editor={inspector:w.hasOwnProperty("_inspector")&&w._inspector,icon:w.hasOwnProperty("_icon")&&w._icon,help:w._help,_showTick:E};var N={type:d};h(e,N,j,w),N.value._id={type:"string",value:j._id},f.__comps__.push(N),A.properties.__scriptAsset.visible=!!j.__scriptUuid,N.value.__scriptAsset.value={uuid:j.__scriptUuid}}}}return f}(n,e)}},module.exports.getInheritanceChain=u;