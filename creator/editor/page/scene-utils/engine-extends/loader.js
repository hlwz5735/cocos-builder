"use strict";var s=cc.loader,r=Editor.assetdb.remote;function e(s){var r=[];if(s)for(var e in Editor.assets)Editor.assets[e]===s&&r.push(e);return r}function t(s,r,e){return r&&!Array.isArray(r)&&(r=[r]),e&&!Array.isArray(e)&&(e=[e]),s.uuid&&(!r||r.some(r=>s.type===r))&&(!e||!e.some(r=>s.type===r))}s.loadRes=function(s,n,l,o,u){if(!s)return null;5!==arguments.length&&(u=o,o=l,l="assets"),l=l||"assets";var a=this._parseLoadResArgs(n,o,u);n=a.type,o=a.onProgress,u=a.onComplete;var i=e(n),f=this;s="db://"+l+"/resources"+(s.startsWith("/")?s:"/"+s),r.queryAssets(s+"?(.*)",n?i:null,function(e,l){if(e)u&&u(e,null);else{for(var o=0;o<l.length;o++){var a=l[o];if(t(a,null,n?null:["folder","javascript","typescript"]))return cc.AssetLibrary.loadAsset(a.uuid,u),void 0}r.queryAssets(s+"?(.*)/*",n?i:null,function(r,e){if(r)u&&u(r,null);else{for(var l=0;l<e.length;l++){var o=e[l];if(t(o,null,n?null:["folder","javascript","typescript"]))return cc.AssetLibrary.loadAsset(o.uuid,u),void 0}f._urlNotFound(s,n,u)}})}})},s.loadResArray=function(r,e,t,n,l){if(!r||0===r.length)return null;5!==arguments.length&&(l=n,n=t,t="assets"),t=t||"assets";var o=this._parseLoadResArgs(e,n,l);e=o.type,n=o.onProgress,l=o.onComplete;var u=e instanceof Array,a=[],i=r.length,f=0;(function o(c){s.loadRes(r[c],u?e[c]:e,t,null,function(s,r){s?l&&l(s,null):(f+=1,n&&n(f,i,r),a.push(r),f===i?l(s,a):o(f))})})(f)},s.loadResDir=function(s,n,l,o,u){if(!s)return null;5!==arguments.length&&(u=o,o=l,l="assets"),s="db://"+(l=l||"assets")+"/resources"+(s.startsWith("/")?s:"/"+s);var a=this._parseLoadResArgs(n,o,u);if(n=a.type,o=a.onProgress,u=a.onComplete,t(r.assetInfo(s),["folder"])){var i=e(n);r.queryAssets(s+"/**/*",n?i:null,function(s,r){if(s)return u&&u(s,null),void 0;let e=[];r.forEach(s=>{t(s,null,["folder","javascript","typescript"])&&e.push(s.uuid)}),0===e.length&&u(s,[]);var n=[],l=e.length,a=0;(function s(r){cc.AssetLibrary.loadAsset(e[r],function(r,e){r?u&&u(r,null):(a+=1,o&&o(a,l,e),n.push(e),a===l?u(r,n):s(a))})})(a)})}else this._urlNotFound(s,null,u)};