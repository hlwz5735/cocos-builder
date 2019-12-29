"use strict";const e=require("electron"),i=require("fire-url"),t=require("fire-fs"),n=require("lodash"),s=require("events"),o=e.BrowserWindow,a="1.1.1",r=100;let d=[],l=null,h="",u=null;class w extends s{constructor(i,s){if(super(),s=s||{},n.defaultsDeep(s,{windowType:"dockable",width:400,height:300,acceptFirstMouse:!0,disableAutoHideCursor:!0,backgroundColor:"#333",webPreferences:{preload:c.url("editor-framework://renderer.js")},defaultFontSize:13,defaultMonospaceFontSize:13}),this._loaded=!1,this._currentSessions={},this._panels=[],this._layout=null,l){let e=l.data;e.windows&&e.windows[i]&&(this._layout=e.windows[i].layout)}switch(this.name=i,this.hideWhenBlur=!1,this.windowType=s.windowType,this.save=s.save,"boolean"!=typeof this.save&&(this.save=!0),this.windowType){case"dockable":s.resizable=!0,s.alwaysOnTop=!1;break;case"float":s.resizable=!0,s.alwaysOnTop=!0;break;case"fixed-size":s.resizable=!1,s.alwaysOnTop=!0;break;case"quick":s.resizable=!0,s.alwaysOnTop=!0,this.hideWhenBlur=!0}if(this.nativeWin=new o(s),void 0===s.x&&void 0===s.y&&w.main){let i=e.screen.getDisplayMatching(w.main.nativeWin.getBounds()),t=this.nativeWin.getSize(),n=.5*(i.workArea.width-t[0]),s=.5*(i.workArea.height-t[1]);n=Math.floor(n),s=Math.floor(s),n<0||s<0?(this.nativeWin.setPosition(i.workArea.x,i.workArea.y),setImmediate(()=>{this.nativeWin.center()})):this.nativeWin.setPosition(n,s)}this.hideWhenBlur&&this.nativeWin.setAlwaysOnTop(!0),this.nativeWin.on("focus",()=>{f.focused||(f.focused=!0,f.emit("focus"))}),this.nativeWin.on("blur",()=>{setImmediate(()=>{o.getFocusedWindow()||(f.focused=!1,f.emit("blur"))}),this.hideWhenBlur&&this.nativeWin.hide()}),this.nativeWin.on("close",e=>{"quick"===this.windowType&&(e.preventDefault(),this.nativeWin.hide()),w._saveWindowStates()}),this.nativeWin.on("closed",()=>{for(let e in this._currentSessions){W._closeSessionThroughWin(e);let i=this._currentSessions[e];i&&i()}this._currentSessions={},this.isMainWindow?(w.removeWindow(this),w.main=null,p._quit()):w.removeWindow(this),this.dispose()}),this.nativeWin.on("unresponsive",e=>{m.error(`Window "${this.name}" unresponsive: ${e}`)}),this.nativeWin.webContents.on("dom-ready",()=>{["theme://globals/common.css","theme://globals/layout.css"].forEach(e=>{let i=t.readFileSync(p.url(e),"utf8");this.nativeWin.webContents.insertCSS(i)})}),this.nativeWin.webContents.on("did-finish-load",()=>{this._loaded=!0}),this.nativeWin.webContents.on("crashed",e=>{m.error(`Window "${this.name}" crashed: ${e}`)}),this.nativeWin.webContents.on("will-navigate",(i,t)=>{i.preventDefault(),e.shell.openExternal(t)}),w.addWindow(this)}dispose(){this.nativeWin=null}load(e,n){let s=c.url(e);if(!s)return m.error(`Failed to load page ${e} for window "${this.name}"`),void 0;this._url=e,this._loaded=!1;let o=n?encodeURIComponent(JSON.stringify(n)):void 0;if(t.existsSync(s))return s=i.format({protocol:"file",pathname:s,slashes:!0,hash:o}),this.nativeWin.loadURL(s),void 0;o&&(s=`${s}#${o}`),this.nativeWin.loadURL(s)}show(){this.nativeWin.show()}hide(){this.nativeWin.hide()}close(){this._loaded=!1,this.nativeWin.close()}forceClose(){this._loaded=!1,w._saveWindowStates(),this.nativeWin&&this.nativeWin.destroy()}focus(){this.nativeWin.focus()}minimize(){this.nativeWin.minimize()}restore(){this.nativeWin.restore()}openDevTools(e){e=e||{mode:"detach"},this.nativeWin.openDevTools(e)}closeDevTools(){this.nativeWin.closeDevTools()}adjust(i,t,n,s){let o=!1;"number"!=typeof i&&(o=!0,i=0),"number"!=typeof t&&(o=!0,t=0),("number"!=typeof n||n<=0)&&(o=!0,n=800),("number"!=typeof s||s<=0)&&(o=!0,s=600);let a=e.screen.getDisplayMatching({x:i,y:t,width:n,height:s});if(this.nativeWin.setSize(n,s),this.nativeWin.setPosition(a.workArea.x,a.workArea.y),!o){let e=a.workArea,s=e.x+r,d=e.y,l=e.x+(e.width-r),h=e.y+(e.height-r);(i+n<=s||i>=l||t<=d||t>=h)&&(o=!0)}o?this.nativeWin.center():this.nativeWin.setPosition(i,t)}resetLayout(e){let i,n=p.url(e);n||(n=p.url(h));try{i=JSON.parse(t.readFileSync(n))}catch(e){p.error(`Failed to load default layout: ${e.message}`),i=null}i&&(W._closeAllSessions(),this.send("editor:reset-layout",i))}emptyLayout(){W._closeAllSessions(),this.send("editor:reset-layout",null)}_send(...e){let i=this.nativeWin.webContents;return i?(i.send.apply(i,e),!0):(m.error(`Failed to send "${e[0]}" to ${this.name} because web contents are not yet loaded`),!1)}_sendToPanel(e,i,...t){if("string"!=typeof i)return m.error(`The message ${i} sent to panel ${e} must be a string`),void 0;let n=W._popReplyAndTimeout(t,W.debug);if(!n)return t=["editor:ipc-main2panel",e,i,...t],!1===this._send.apply(this,t)&&m.failed(`send message "${i}" to panel "${e}" failed, no response received.`),void 0;let s=W._newSession(i,`${e}@main`,n.reply,n.timeout,this);return this._currentSessions[s]=n.reply,t=["editor:ipc-main2panel",e,i,...t,W.option({sessionId:s,waitForReply:!0,timeout:n.timeout})],this._send.apply(this,t),s}_closeSession(e){this.nativeWin&&delete this._currentSessions[e]}_addPanel(e){-1===this._panels.indexOf(e)&&this._panels.push(e)}_removePanel(e){let i=this._panels.indexOf(e);-1!==i&&this._panels.splice(i,1)}_removeAllPanels(){this._panels=[]}send(e,...i){if("string"!=typeof e)return m.error(`Send message failed for '${e}'. The message must be a string`),void 0;let t=W._popReplyAndTimeout(i,W.debug);if(!t)return i=[e,...i],!1===this._send.apply(this,i)&&m.failed(`send message "${e}" to window failed. No response was received.`),void 0;let n=W._newSession(e,`${this.nativeWin.id}@main`,t.reply,t.timeout,this);return this._currentSessions[n]=t.reply,i=["editor:ipc-main2renderer",e,...i,W.option({sessionId:n,waitForReply:!0,timeout:t.timeout})],this._send.apply(this,i),n}popupMenu(e,i,t){void 0!==i&&(i=Math.floor(i)),void 0!==t&&(t=Math.floor(t));let n=this.nativeWin.webContents,s=new y(e,n);s.nativeMenu.popup(this.nativeWin,i,t),s.dispose()}get isMainWindow(){return w.main===this}get isFocused(){return this.nativeWin.isFocused()}get isMinimized(){return this.nativeWin.isMinimized()}get isLoaded(){return this._loaded}get panels(){return this._panels}static get defaultLayoutUrl(){return h}static set defaultLayoutUrl(e){h=e}static get windows(){return d.slice()}static set main(e){return u=e}static get main(){return u}static find(e){if("string"==typeof e){for(let i=0;i<d.length;++i){let t=d[i];if(t.name===e)return t}return null}if(e instanceof o){for(let i=0;i<d.length;++i){let t=d[i];if(t.nativeWin===e)return t}return null}for(let i=0;i<d.length;++i){let t=d[i];if(t.nativeWin&&t.nativeWin.webContents===e)return t}return null}static addWindow(e){d.push(e)}static removeWindow(e){let i=d.indexOf(e);if(-1===i)return m.warn(`Cannot find window ${e.name}`),void 0;d.splice(i,1)}static getPanelWindowState(e){if(l){let i=l.data.panels[e];if(i)return{x:i.x,y:i.y,width:i.width,height:i.height}}return{}}static _saveWindowStates(){if("test"===p.argv._command)return;if(!w.main)return;if(!l)return;let e=l.data;e.version=a,e.windows={};for(let i=0;i<d.length;++i){let t=d[i],n=t.nativeWin.getBounds();if(t.save?(n.width||(m.warn(`Failed to commit window state. Invalid window width: ${n.width}`),n.width=800),n.height||(m.warn(`Failed to commit window state. Invalid window height ${n.height}`),n.height=600),e.windows[t.name]={main:t.isMainWindow,url:t._url,windowType:t.windowType,x:n.x,y:n.y,width:n.width,height:n.height,layout:t._layout,panels:t._panels}):e.windows[t.name]={},!t.isMainWindow&&1===t.panels.length){let e=t.panels[0];l.data.panels[e]={x:n.x,y:n.y,width:n.width,height:n.height}}}l.save()}static _loadWindowStates(){(l=v.load("profile://local/layout.windows.json",{version:a,windows:{},panels:{}})).data.version!==a&&l.reset({version:a,windows:{},panels:{}})}static _restoreWindowStates(e){if(l){let i=Object.assign({},e);for(let e in l.data.windows){let t,n=l.data.windows[e];c.url(n.url)&&(n.main?(i.show=!1,i.windowType=n.windowType,t=new w(e,i),w.main=t):t=new w(e,{show:!1,windowType:n.windowType}),"simple"===n.windowType&&(t._panels=n.panels),!n.main&&n.panels&&n.panels.length&&t.nativeWin.setMenuBarVisibility(!1),t.adjust(n.x,n.y,n.width,n.height),t.show(),t.load(n.url))}if(w.main)return w.main.focus(),!0}return!1}}module.exports=w;const p=require("./editor"),c=require("./protocol"),f=require("./app"),v=require("electron-profile"),m=require("./console"),y=require("./menu"),W=require("./ipc"),g=e.ipcMain;g.on("editor:window-open",(e,i,t,n)=>{let s=new w(i,n=n||{});s.nativeWin.setMenuBarVisibility(!1),n.width&&n.height&&s.nativeWin.setContentSize(n.width,n.height),s.load(t,n.argv),s.show()}),g.on("editor:window-query-layout",e=>{let i=o.fromWebContents(e.sender),n=w.find(i);if(!n)return m.warn("Failed to query layout, cannot find the window."),e.reply(),void 0;let s=n._layout;if(n.isMainWindow&&!s){let e=c.url(h);if(t.existsSync(e))try{s=JSON.parse(t.readFileSync(e))}catch(e){m.error(`Failed to load default layout: ${e.message}`),s=null}}e.reply(null,s)}),g.on("editor:window-save-layout",(e,i)=>{let t=o.fromWebContents(e.sender),n=w.find(t);if(!n)return m.warn("Failed to save layout, cannot find the window."),void 0;n._layout=i,w._saveWindowStates()}),g.on("editor:window-focus",e=>{let i=o.fromWebContents(e.sender),t=w.find(i);if(!t)return m.warn("Failed to focus, cannot find the window."),void 0;t.isFocused||t.focus()}),g.on("editor:window-load",(e,i,t)=>{let n=o.fromWebContents(e.sender),s=w.find(n);if(!s)return m.warn("Failed to focus, cannot find the window."),void 0;s.load(i,t)}),g.on("editor:window-resize",(e,i,t,n)=>{let s=o.fromWebContents(e.sender),a=w.find(s);if(!a)return m.warn("Failed to focus, cannot find the window."),void 0;n?a.nativeWin.setContentSize(i,t):a.nativeWin.setSize(i,t)}),g.on("editor:window-center",e=>{let i=o.fromWebContents(e.sender),t=w.find(i);if(!t)return m.warn("Failed to focus, cannot find the window."),void 0;t.nativeWin.center()}),g.on("editor:window-inspect-at",(e,i,t)=>{let n=o.fromWebContents(e.sender);if(!n)return m.warn(`Failed to inspect at ${i}, ${t}, cannot find the window.`),void 0;n.inspectElement(i,t),n.devToolsWebContents&&n.devToolsWebContents.focus()}),g.on("editor:window-remove-all-panels",e=>{let i=o.fromWebContents(e.sender),t=w.find(i);if(!t)return e.reply(),void 0;t._removeAllPanels(),e.reply()});