"use strict";let e={};module.exports=e;const t=require("fire-path"),i=require("mousetrap"),n=require("./dom-utils"),r=require("electron-profile"),o=require("../../console"),a=require("../../i18n"),s=require("../../../share/js-utils"),l=require("../../../share/ipc-listener");let u=0;function d(e,t,i,n,r){if(!r||"function"!=typeof r)return o.warn(`Failed to register ipc message ${n} in panel ${t}, function not provide.`),void 0;e.on(n,(e,...t)=>{r.apply(i,[e,...t])})}function f(e,t,i,n,r){let a=i[r];if(!a||"function"!=typeof a)return o.warn(`Failed to register shortcut, cannot find method ${r} in panel ${e}.`),void 0;t.bind(n,a.bind(i))}e.importing=!1,e.templatize=function(e,t,i){let n=document.createElement("template");return n.innerHTML=t,e.templatize(n),e.stamp(i)},e.bind=function(e,t,i,r){let o=n.camelCase(r);e.addEventListener(t+"-changed",function(e){e.detail.path?i.set(e.detail.path,e.detail.value):i.set(o,e.detail.value)}),i.addEventListener(r+"-changed",function(i){i.detail.path?e.set(i.detail.path,i.detail.value):e.set(t,i.detail.value)})},e.bindUUID=function(e,t,i,r){let o=n.camelCase(r);e.addEventListener(t+"-changed",function(e){e.detail.path===t+".uuid"?i.set(o,e.detail.value):e.detail.value?i.set(o,e.detail.value.uuid):i.set(o,null)}),i.addEventListener(r+"-changed",function(i){e.set(t,{uuid:i.detail.value})})},e.getSelfOrAncient=function(e,t){let i=e;for(;i;){if(i instanceof t)return i;i=Polymer.dom(i).parentNode}return 0},e.isSelfOrAncient=function(e,t){let i=e;for(;i;){if(i===t)return!0;i=Polymer.dom(i).parentNode}return!1},e.import=function(t,i){++u,e.importing=!0,Polymer.Base.importHref(t,function(){0===--u&&(e.importing=!1),i&&i()},function(){0===--u&&(e.importing=!1),i&&i(new Error(`${t} not found.`))})},e.registerElement=function(t){if(!t.is){let e=document.currentScript.parentElement;if(!e||"DOM-MODULE"!==e.tagName)return o.error("Failed to register widget %s. The script must be inside a <dom-module> tag."),void 0;t.is=e.id}if(e.elements||(e.elements={}),e.elements[t.is])return o.error("Failed to register widget %s since it already exists.",t.is),void 0;t._T=function(e,t){return a.t(e,t)},e.elements[t.is]=Polymer(t)},e.registerPanel=function(t,i){if(!i.is){let e=document.currentScript.parentElement;if(!e||"DOM-MODULE"!==e.tagName)return o.error(`Failed to register panel ${t}, the script must be inside a <dom-module> tag.`),void 0;i.is=e.id}if(e.panels||(e.panels={}),void 0!==e.panels[t])return o.error(`Failed to register panel ${t}, that panelID has already been registered.`),void 0;i._T=function(e,t){return a.t(e,t)},e.panels[t]=Polymer(i)},e.newFrame=function(n,u,p){let c=t.join(u.path,u.main);e.import(c,c=>{if(c)return p&&p(new Error(`Failed to load panel ${n}: ${c.message}`)),void 0;let m=e.panels[n];if(!m)return p&&p(new Error(`Failed to load panel ${n}: Cannot find panel frame constructor in "UI.PolymerUtils.panels"`)),void 0;(function(e,t){var i=e.profileTypes.map(e=>new Promise((i,n)=>{r.load(`profile://${e}/${t}.json`,(t,r)=>{t?(o.warn(`failed to load profile ${url}: ${t.message}.`),n(t)):i({type:e,profile:r})})}));return Promise.all(i).then(e=>{var t={};return e.forEach(e=>{t[e.type]=e.profile}),Promise.resolve(t)})})(u,n).then(e=>{let r=new m;r._info=u,r.classList.add("fit"),r.tabIndex=1,r.setAttribute("id",n),u.icon&&(r.icon=new Image,r.icon.src=t.join(u.path,u.icon)),s.assign(r,{get name(){return this._info?a.format(this._info.title):this.id},get popable(){return!this._info||this._info.popable},get width(){if(!this._info)return"auto";let e=parseInt(this._info.width);return isNaN(e)?"auto":e},get minWidth(){if(!this._info)return 50;let e=parseInt(this._info["min-width"]);return isNaN(e)?50:e},get maxWidth(){if(!this._info)return"auto";let e=parseInt(this._info["max-width"]);return isNaN(e)?"auto":e},get height(){if(!this._info)return"auto";let e=parseInt(this._info.height);return isNaN(e)?"auto":e},get minHeight(){if(!this._info)return 50;let e=parseInt(this._info["min-height"]);return isNaN(e)?50:e},get maxHeight(){if(!this._info)return"auto";let e=parseInt(this._info["max-height"]);return isNaN(e)?"auto":e}});let c=new l;for(let e in r.messages)d(c,n,r,e,r.messages[e]);if(r._ipcListener=c,r.profiles=e,u.shortcuts){let e=[],t=new i(r);e.push(t);for(let a in u.shortcuts)if(a.length>1&&"#"===a[0]){let t;if(!(t=u.ui?r.querySelector(a):r.root.querySelector(a))){o.warn(`Failed to register shortcut for element ${a}, cannot find it.`);continue}let s=u.shortcuts[a],l=new i(t);e.push(l);for(let e in s)f(n,l,r,e,s[e])}else f(n,t,r,a,u.shortcuts[a]);r._mousetrapList=e}p&&p(null,r)})})};