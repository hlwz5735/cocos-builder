"use strict";let e={node:"popup-node-menu",create:"popup-create-menu",search:"popup-search-menu"},o=!1;exports.setRecord=function(e){o=!!e},exports.popup=function(t,n){let p=Editor.Selection.contexts("node");Editor.Ipc.sendToMain(`hierarchy:${e[t]}`,n.x,n.y,o,!!(p&&p.length>0))};