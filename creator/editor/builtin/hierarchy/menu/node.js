"use strict";const e=require("./create");module.exports=function(t,l){return[{label:Editor.T("HIERARCHY.create"),enabled:!t,submenu:e(!0,t)},{type:"separator"},{label:Editor.T("HIERARCHY.copy"),enabled:!t&&l,click(){let e=Editor.Selection.curSelection("node");Editor.Ipc.sendToPanel("scene","scene:copy-nodes",e)}},{label:Editor.T("HIERARCHY.paste"),enabled:!t&&l,click(){let e=Editor.Selection.contexts("node");Editor.Ipc.sendToPanel("scene","scene:paste-nodes",e.length>0?e[0]:"")}},{label:Editor.T("HIERARCHY.duplicate"),enabled:!t&&l,click(){let e=Editor.Selection.contexts("node");e.length>0&&Editor.Ipc.sendToPanel("hierarchy","duplicate",e)}},{type:"separator"},{label:Editor.T("HIERARCHY.rename"),enabled:!t&&l,click(){let e=Editor.Selection.contexts("node");e.length>0&&Editor.Ipc.sendToPanel("hierarchy","rename",e[0])}},{label:Editor.T("HIERARCHY.delete"),enabled:!t&&l,click(){let e=Editor.Selection.contexts("node");e.length>0&&Editor.Ipc.sendToPanel("hierarchy","delete",e)}},{type:"separator"},{label:Editor.T("HIERARCHY.show_path"),enabled:l,click(){let e=Editor.Selection.contexts("node");e.length>0&&Editor.Ipc.sendToPanel("hierarchy","show-path",e[0])}}]};