const e=require("electron").app,t=(require("electron").ipcMain,require("http")),a=require("node-uuid"),n=require("./config").caAppID,r=require("./config").caURL,{EventEmitter:s}=require("events");module.exports=new class extends s{constructor(){super(),this._defaultParams={appVersion:e.getVersion(),versionCode:"v1",uniqueID:this.user.userId,appID:n,channelID:"100000",platform:"darwin"===process.platform?"Mac":"Windows",engine:"electron",userID:this.user.userId,resolution:"unknown",osVersion:require("os").release(),language:Editor.lang||"unknown",manufacturer:"",store:"unknown",age:0,sex:0,callNumber:"unknown",model:null}}init(){}get user(){let e=Editor.Profile.load("profile://global/user_token.json"),t=e.data;return{userName:e.nickname,email:e.email,userId:t.cocos_uid}}_genMsgID(){return a.v4()}trackEvent(e){let t={action:e.action};e.label&&(t.label=e.label),e.value&&(t=Object.assign(t,e.value));let a="succeed";e.value&&e.value.eventTag&&(a=e.value.eventTag,delete t.eventTag);let n=this.defaultParams;n.eventID=e.category,n.eventValue=t,n.eventTag=a;let s=r+encodeURIComponent(JSON.stringify(n));this._get(s)}_get(e){t.get(e,e=>{e.on("data",e=>{})}).on("error",e=>{console.error("send analytics data fail",e)})}trackException(e){let t=this.defaultParams;t.eventID="exception",t.eventValue={desc:e},t.eventTag="succeed";let a=r+encodeURIComponent(JSON.stringify(t));this._get(a)}get defaultParams(){return this._defaultParams.eventID=void 0,this._defaultParams.eventValue=void 0,this._defaultParams.eventTag=void 0,this._defaultParams.msgID=this._genMsgID(),this._defaultParams.chargeTime=String(Date.now()/1e3|0),this._defaultParams}};