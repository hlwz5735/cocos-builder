"use strict";const e=require("electron").ipcMain,{EventEmitter:t}=require("events"),o=require("../../request.js").sendRequest,c=require("md5"),r=require("getmac"),i=require("../lib/config").trackID,n=require("../../cocos-analytics");let l="",a="";let s=module.exports=new class extends t{constructor(){super(),this.trackID=i}trackEvent(e,t){if(!l)return console.log("no valid user ID"),void 0;if(!a)return console.log("no valid client ID"),void 0;let c={v:1,tid:i,cid:a,uid:l,t:"event",ec:e.category,ea:e.action};e.label&&(c.el=e.label),o({method:"POST",host:"www.google-analytics.com",path:"/collect",protocol:"https",data:c},function(e,o){e&&console.log(e),t&&t(e,o)}),n.trackEvent(e)}trackException(e,t){if(!a)return console.log("no valid client ID"),void 0;o({method:"POST",host:"www.google-analytics.com",path:"/collect",protocol:"https",data:{v:1,tid:i,cid:a,uid:l,t:"exception",exd:e,exf:0}},function(e,o){e&&console.log(e),t&&t(e,o)}),n.trackException(e)}prepareUserIdentity(){let e=Editor.Profile.load("profile://global/user_token.json"),t=e.data;e.nickname,e.email,l=t.cocos_uid}sendAppInfo(e){if(!a)return console.log("no valid client ID"),void 0;let t=require("semver"),c=Editor.versions.CocosCreator,r=`${t.major(c)}.${t.minor(c)}.${t.patch(c)}`;o({method:"POST",host:"www.google-analytics.com",path:"/collect",protocol:"https",data:{v:1,tid:i,cid:a,uid:l,t:"screenview",an:"CocosCreator",aid:"com.cocos.creator",av:r,cd:"Home"}},function(t,o){t&&console.log(t),e&&e(t,o)})}setClientId(e){r.getMac(function(t,o){let r="";if(t){console.log(t);let e=require("os").networkInterfaces(),o=!1;for(var i in e){let t=e[i];for(let e=0;e<t.length;++e){let i=t[e];if(!i.internal&&i.mac){r=c(i.mac),o=!0;break}}if(o)break}o||(r=c("00:00:00:00:00:00"))}else r=c(o);a=r,e()})}};e.on("metrics:track-event",(e,t)=>{s.trackEvent(t,null)}),e.on("metrics:track-exception",(e,t)=>{s.trackException(t,null)});