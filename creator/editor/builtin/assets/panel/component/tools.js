"use strict";const e=require("fs"),t=require("path"),r=(require("../utils/cache"),require("../utils/operation"),require("../utils/event")),i=require("../utils/utils"),u=require("../utils/communication");exports.template=e.readFileSync(t.join(__dirname,"../template/tools.html"),"utf-8"),exports.props=["filter"],exports.data=function(){return{input:!1}},exports.created=function(){r.on("nodes_focus",e=>{this.input=!e})},exports.methods={t:e=>Editor.T(e),refresh(){r.emit("refresh-node-tree")},createPopup(e){u.popup("create",{x:e.x-20,y:e.y+20})},showSortMenu(e){u.popup("sort",{x:e.x-20,y:e.y+20})},searchPopup(){u.popup("search",{x:event.x-100,y:event.y+25})},onFilterAssets(){r.emit("filter-changed",event.target.value)},emptyFilter(){i.emptyFilter()},oInputnFocus(){this.input=!0},onInputBlur(){this.input=!1}};