"use strict";var t=require("path");const{promisify:e}=require("util");var r=require("fire-fs"),i=require("del"),s=require("globby");const n=e(r.outputFile);module.exports=class{constructor(t,e){this.dest=t,this.jsonSpace=e?2:0}getUuidPathNoExt(e){return t.join(this.dest,e.slice(0,2),e)}getJsonPath(t){return this.getUuidPathNoExt(t)+".json"}write(t,e,i){r.outputFile(t,e,i)}writeJsonByUuidNoCache(t,e,i){if(!i)return n(this.getJsonPath(t),e);r.outputFile(this.getJsonPath(t),e,i)}writeJsonByUuid(t,e,r){var i=JSON.stringify(e,null,this.jsonSpace);return this.writeJsonByUuidNoCache(t,i,r)}read(t,e){r.readFile(t,e)}readJsonByUuid(t,e){var i=this.getJsonPath(t);r.readFile(i,function(t,r){if(t)return e(t);var s;try{s=JSON.parse(r)}catch(t){return t.message=i+": "+t.message,e(t)}e(null,s)})}delete(t,e){i(t,{force:!0}).then(t=>{e()}).catch(e)}deleteJsonsByUuid(t,e){var r=t.map(this.getJsonPath.bind(this));this.delete(r,e)}flush(e){var i=t.join(this.dest,"??/");s(i,(t,i)=>{if(t)return e(t);try{for(var s=0;s<i.length;s++){var n=i[s];0===r.readdirSync(n).length&&r.rmdirSync(n)}}catch(t){return e(t)}e()})}};