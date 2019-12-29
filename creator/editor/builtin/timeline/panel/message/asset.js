"use strict";const e=require("../libs/manager"),{promisify:i}=require("util"),t=require("../libs/advice");module.exports={async"asset-changed"(s,a){if("animation-clip"!==a.type||!e.isExists(a.uuid))return;let l=await i(cc.AssetLibrary.loadAsset)(a.uuid);if(e.equal(a.uuid,l))return;let r=e.Clip.queryInfo(a.uuid);if(0===Editor.Dialog.messageBox({type:"question",buttons:[Editor.T("timeline.message.ignore"),Editor.T("timeline.message.read_hard_disk")],title:"",message:`Clip - ${r.name}`,detail:Editor.T("timeline.message.external_changes"),defaultId:0,cancelId:0,noLink:!0}))return e.sync(a.uuid),void 0;let d=this.vm.clips.map(e=>e.id),n=[];for(let e=0;e<d.length;e++){let t=d[e],s=await i(cc.AssetLibrary.loadAsset)(t);n.push(s)}t.emit("change-clips",n)},"assets-deleted"(i,t){for(let i=0;i<t.length;++i){let s=t[i];if("animation-clip"===s.type&&e.isExists(s.uuid)){this.vm.updateClips();break}}},"assets-moved"(){}};