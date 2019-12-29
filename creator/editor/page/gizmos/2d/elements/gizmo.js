"use strict";const t=Editor.require("scene://utils/node"),e=Editor.require("scene://utils/animation"),i=require("../../utils/external").EditorCamera;let r=require("./tools").rectTool.Type,s=Editor.GizmosUtils.snapPixelWihVec2,o=1e-6;const n=cc.vmath.vec3,a=cc.vmath.mat4;let c=a.create(),l=cc.v3();function h(t,e){return Math.abs(t-e)<o}module.exports=class{constructor(t,e){this.hovering=!1,this.selecting=!1,this.editing=!1,this._view=t,this._root=null,this._hidden=!0,this._controller=null,this._adjustMap=[],this.registerAdjustValue(cc.Vec2,["x","y"]),this.registerAdjustValue(cc.Vec3,["x","y","z"]),this.registerAdjustValue(cc.Size,["width","height"]),this._dirty=!0,this._lastMats={},this._isInited=!1,this.target=e}get target(){return this._target}set target(t){this._target=t,null==this.target||this.target.length<=0||this.onTargetUpdate&&this.onTargetUpdate()}layer(){return"scene"}createRoot(){let t=this._view[this.layer()];if(!t)return Editor.warn(`Plase make gizmo layer exists [${this.layer()}] in Gizmo View`),void 0;this._root=t.group(),this._registerEvent(),this.onCreateRoot&&this.onCreateRoot()}ensureController(){this._controller||this.createController()}createController(){this.onCreateController&&this.onCreateController()}registerMoveSvg(t,e,i){i?Editor.GizmosUtils.addMoveHandles(t,i,this.createMoveCallbacks(e)):Editor.GizmosUtils.addMoveHandles(t,this.createMoveCallbacks(e))}createMoveCallbacks(t){this._moveCallbacks||(this._moveCallbacks=this.onCreateMoveCallbacks());let e=this._moveCallbacks,i=!1;return{start:function(r,s,o){i=!1,s=cc.view.getCanvasSize().height-s;let n=Array.prototype.slice.call(arguments,2,arguments.length);n=[r,s].concat(n),n=void 0!==t?n.concat(t):n,e.start&&e.start.apply(this,n)}.bind(this),update:function(r,s,o){if(0===r&&0===s)return;i=!0,s=-s,this.recordChanges();let n=Array.prototype.slice.call(arguments,2,arguments.length);n=[r,s].concat(n),n=void 0!==t?n.concat(t):n,e.update&&e.update.apply(this,n),this._view.repaintHost()}.bind(this),end:function(r){let s=Array.prototype.slice.call(arguments,0,arguments.length);s=void 0!==t?s.concat(t):s,e.end&&e.end.apply(this,s),i&&this.commitChanges(),i=!1}.bind(this)}}onCreateMoveCallbacks(){return{start(t,e,i){},update(t,e,i){},end(t){}}}recordChanges(){this.nodes.forEach(t=>{_Scene.Undo.recordNode(t.uuid)}),this._dirty=!0}commitChanges(){e.recordNodeChanged(this.nodes),_Scene.Undo.commit(),this._dirty=!0}worldToPixel(t){return s(this._view.worldToPixel(t))}pixelToWorld(t){return this._view.pixelToWorld(t)}sceneToPixel(t){return s(this._view.sceneToPixel(t))}pixelToScene(t){return this._view.pixelToScene(t)}defaultMinDifference(){return Editor.Math.numOfDecimalsF(1/this._view.scale)}registerAdjustValue(t,e){this._adjustMap.push({ctor:t,keys:e})}_checkLockStatus(){return this.node._objFlags&cc.Object.Flags.LockedInEditor}adjustValue(t,e,i){Array.isArray(t)||(t=[t]),void 0===e||Array.isArray(e)||(e=[e]),i=i||this.defaultMinDifference();let r=(t,e)=>{if(e&&"number"==typeof t[e])return t[e]=Editor.Math.toPrecision(t[e],i),void 0;{let i=e?t[e]:t,s=this._adjustMap;for(let t=0;t<s.length;t++){let e=s[t];if(i===e.ctor||i.constructor===e.ctor){for(let t=0;t<e.keys.length;t++)r(i,e.keys[t]);return}}}Editor.warn(`Try to adjust non-number value [${e}}]`)};for(let i=0;i<t.length;i++){let s=t[i];if(void 0===e)r(s);else for(let t=0;t<e.length;t++)r(s,e[t])}}targetValid(){let t=this.target;return Array.isArray(t)&&(t=t[0]),t&&t.isValid}visible(){return this.selecting||this.editing}_viewDirty(){let e=cc.director.getScene(),i=t.getWorldPosition(e),r=this._view.worldToPixel(i),s=!1;return this._lastMapping&&h(this._lastMapping.x,r.x)&&h(this._lastMapping.y,r.y)||(s=!0),this._lastMapping=r,s}_nodeDirty(t){(t=t||this.node).getWorldMatrix(c);let e=!1,i=this._lastMats[t.uuid];return i?h(i.a,c.a)&&h(i.b,c.b)&&h(i.c,c.c)&&h(i.d,c.d)&&h(i.tx,c.tx)&&h(i.ty,c.ty)||(e=!0):(this._lastMats[t.uuid]=i=cc.vmath.mat4.create(),e=!0),cc.vmath.mat4.copy(i,c),e}dirty(){return this._viewDirty()||this._nodeDirty()||this._dirty}update(){if(!this.targetValid()||!this.visible()||this._checkLockStatus())return this.hide(),void 0;if(this.show(),!this.dirty())return;let t=cc.director&&cc.director.getScene();this.onUpdate&&t&&this.onUpdate(),this._dirty=!1}remove(){this._root&&(this._root.remove(),this._root=null)}ensureRoot(){this._root||this.createRoot()}hide(){this._hidden||(this._root&&this._root.hide(),this.onHide&&this.onHide(),this._hidden=!0,this._dirty=!0)}show(){this._hidden&&(this._isInited||(this.init&&this.init(),this._isInited=!0),this.ensureRoot(),this._root&&this._root.show(),this.onShow&&this.onShow(),this._hidden=!1,this._dirty=!0)}rectHitTest(t,e){return!1}_registerEvent(){let t=this._root.node;t.addEventListener("mousedown",()=>{let t=this.nodes.map(t=>t.uuid);Editor.Selection.select("node",t)},!0),t.addEventListener("mouseover",()=>{Editor.Selection.hover("node",this.node.uuid)},!0),t.addEventListener("mouseleave",()=>{Editor.Selection.hover("node",null)},!0),t.addEventListener("mousemove",t=>{t.srcElement.instance.ignoreMouseMove||t.stopPropagation()})}get node(){let t=this.target;return Array.isArray(t)&&(t=t[0]),cc.Node.isNode(t)?t:t instanceof cc.Component?t.node:null}get nodes(){let t=[],e=this.target;if(Array.isArray(e))for(let i=0;i<e.length;++i){let r=e[i];cc.Node.isNode(r)?t.push(r):r instanceof cc.Component&&t.push(r.node)}else cc.Node.isNode(e)?t.push(e):e instanceof cc.Component&&t.push(e.node);return t}get topNodes(){return this.target.filter(t=>{let e=t.parent;for(;e;){if(-1!==this.target.indexOf(e))return!1;e=e.parent}return!0})}get selecting(){return this._selecting}set selecting(t){this._dirty=t!==this._selecting,this._selecting=t}get editing(){return this._editing}set editing(t){this._dirty=t!==this._editing,this._editing=t}get hovering(){return this._hovering}set hovering(t){this._dirty=t!==this._hovering,this._hovering=t}screenToWorld(t){let e=i._camera._camera,r=cc.v3();return n.set(l,t.x,t.y,1),e.screenToWorld(r,l,cc.visibleRect.width,cc.visibleRect.height),r}worldToScreen(t){let e=i._camera._camera,r=cc.v3();return e.worldToScreen(r,t,cc.visibleRect.width,cc.visibleRect.height),r}getWorldDelta(t){let e=this.screenToWorld(cc.Vec2.ZERO),i=this.screenToWorld(t);return i.subSelf(e),i}getScreenDelta(t){let e=this.worldToScreen(cc.Vec3.ZERO),i=this.worldToScreen(t);return i.subSelf(e),i}screenToNodeLocalDelta(t,e){let i=this.getWorldDelta(t);return e&&(e.getWorldMatrix(c),a.invert(c,c),c.m12=c.m13=0,n.transformMat4(i,i,c)),cc.v2(i.x,i.y)}screenToNodeLocalPos(t,e){let i=this.screenToWorld(t);return e&&(e.getWorldMatrix(c),a.invert(c,c),n.transformMat4(i,i,c)),cc.v2(i.x,i.y)}getLocalAxisAlignDelta(t,e,i){let s=cc.quat();i.getWorldRotation(s);let o=cc.v3(e.x,e.y,0),a=cc.v2();return t===r.Left||t===r.Right?(n.transformQuat(l,cc.Vec3.RIGHT,s),a.x=o.dot(l)):t===r.Top||t===r.Bottom?(n.transformQuat(l,cc.Vec3.UP,s),a.y=o.dot(l)):t!==r.LeftTop&&t!==r.LeftBottom&&t!==r.RightTop&&t!==r.RightBottom||(n.transformQuat(l,cc.Vec3.RIGHT,s),a.x=o.dot(l),n.transformQuat(l,cc.Vec3.UP,s),a.y=o.dot(l)),a}};