"use strict";const e=require("fire-fs"),r=require("fire-path"),t=require("events"),{parse:n}=require("url"),{stringify:s}=require("querystring"),{request:o}=require("https");let i=new t.EventEmitter,u=function(){return new Promise((e,r)=>{Editor.Ipc.sendToMain("app:query-last-create-path",(r,t)=>{e(r||t)})})};exports.getUserHome=async function(){let t=await u();if(t&&e.existsSync(t))return t;if(!Editor.isWin32)return process.env.HOME||process.env.HOMEPATH||process.env.USERPROFILE;if(!process.env.USERPROFILE)return process.cwd();let n=r.join(process.env.USERPROFILE,"Documents");return e.existsSync(n)?n:(n=r.join(process.env.USERPROFILE,"My Documents"),e.existsSync(n)?n:process.cwd())},exports.event=i,exports.sendGetRequest=function(e,r){return new Promise((t,i)=>{var u=n(e);r=s(r||{});var a={method:"GET",host:u.hostname,port:u.port||443,path:u.pathname+"?"+r,headers:{"User-Agent":"Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36"}},c="";o(a,e=>{if(200!==e.statusCode)return i(new Error("Connect Failed")),void 0;e.on("data",e=>{c+=e}).on("end",()=>{var e=null;try{e=JSON.parse(c)}catch(e){return i(e)}t(e)})}).on("error",e=>{i(e)}).setTimeout(8e3,()=>{i(new Error("timeout"))}).end()})};