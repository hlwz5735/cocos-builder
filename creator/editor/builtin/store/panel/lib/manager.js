"use strict";const e=require("fs"),t=require("path");let n=[],r=[],i={},o=function(n,r){if(!e.existsSync(n))return;let o=e.statSync(n);if(i[n]!==o.mtime-0){for(i[n]=o.mtime-0;r.length;)r.splice(0,1);e.readdirSync(n).forEach(i=>{let o=t.join(n,i),c=t.join(o,"package.json");if(!e.existsSync(o)||!e.existsSync(c))return;let s=e.statSync(o),a=JSON.parse(e.readFileSync(c,"utf-8"));r.push({name:a.name,version:a.version,path:o,ctime:function(e){return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}(s.ctime)})})}};exports.searchGlobal=function(){let e=t.join(Editor.remote.App.home,"packages");return o(e,r),r},exports.searchLocal=function(){let e=t.join(Editor.remote.Project.path,"packages");return o(e,n),n},exports.updated=function(e){};