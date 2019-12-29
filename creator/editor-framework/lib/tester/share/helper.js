"use strict";const e=require("electron"),s=require("sinon");let t=null;t=Editor.isMainProcess?e.ipcMain:e.ipcRenderer;let r={_reply(...e){let s=function(e){let s,t,r=e[e.length-1];if("number"==typeof r){if(e.length<2)return null;if(t=r,"function"!=typeof(r=e[e.length-2]))return null;s=r,e.splice(-2,2)}else{if("function"!=typeof r)return null;s=r,t=5e3,e.pop()}return{reply:s,timeout:t}}(e);if(!s)return!1;for(let t=0;t<this._spyReplys.length;++t){let r=this._spyReplys[t];if(e.length!==r.args.length)continue;let i=!0;for(let s=0;s<r.args.length;++s)if(e[s]!==r.args[s]){i=!1;break}if(i)return s.reply.apply(null,r.replyArgs),!0}return!1},_spy(){this._spying=!0,this._spyWithArgs={},this._spyReplys=[],["sendToMain","sendToPanel","sendToMainWin"].forEach(e=>{let t=Editor.Ipc[e];this[`_${e}`]=t,Editor.Ipc[e]=((...e)=>{this._reply.apply(this,e)||t.apply(Editor.Ipc,e)}),this[e]=s.spy(Editor.Ipc,e)}),["sendToWins","sendToAll"].forEach(e=>{this[`_${e}`]=Editor.Ipc[e],Editor.Ipc[e]=function(){},this[e]=s.spy(Editor.Ipc,e)})},_unspy(){if(!this._spying)return;this._spying=!0,this._spyWithArgs=null,this._spyReplys=null;["sendToMain","sendToPanel","sendToMainWin","sendToWins","sendToAll"].forEach(e=>{this[e].restore(),Editor[e]=this[`_${e}`],this[`_${e}`]=null})},detectLeak(e){Object.defineProperty(global,e,{set:()=>{let e=new Error("Global leak happens here!!");throw console.log(e.stack),e}})},runEditor(e,s){let t=this;if(!(e instanceof tap.Test))throw new TypeError("Expected tap.Test instance, got "+typeof e);e.beforeEach(e=>{Editor.init(s),s.enableIpc||t._spy(),e()}),e.afterEach(e=>{s.enableIpc||t._unspy(),e()})},reset(){["sendToMain","sendToPanel","sendToMainWin","sendToWins","sendToAll"].forEach(e=>{this[e].reset&&this[e].reset()}),this._spyWithArgs={},this._spyReplys=[]},message(e,s){let t=this._spyWithArgs[e];return t?t[s]:null},spyMessages(e,s){if(!this._spyWithArgs)throw new Error("Do not spy on message before `Helper.spy` is invoked");let t=this[e];if(!t)return;let r=[],i=this._spyWithArgs[e]||{};return s.forEach(e=>{let s=t.withArgs(e);i[e]=s,r.push(s)}),this._spyWithArgs[e]=i,r},reply(...e){if(!this._spyReplys)throw new Error("Do not register your reply before `Helper.spy` is invoked");return e.length?Array.isArray(e[e.length-1])?(e=[].slice.call(e,0,e.length-1),this._spyReplys.push({args:e,replyArgs:e[e.length-1]}),void 0):(Editor.error("The last argument must be an array"),void 0):(Editor.error("You must specify your spy arguments"),void 0)},send(e,...s){s=[e,{},...s],t.emit.apply(t,s)}};module.exports=r;