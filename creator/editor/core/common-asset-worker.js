let e,n,t={async _init(){if(!e)return n?new Promise(e=>{let t=setInterval(function(){n||(clearInterval(t),e())},100)}):(n=!0,new Promise(t=>{Editor.App.spawnWorker("app://editor/page/worker/common-asset-worker",function(r,o){n=!1,(e=r).send("app:init-common-asset-worker",function(){t()},-1),o.once("closed",function(){e=null})},!1,!0)}))},async start(n,t){return await this._init(),new Promise((r,o)=>{e.send("app:start-common-asset-worker",n,t,function(e,n){if(e)return o(e);r(n)},-1)})}};module.exports=t;