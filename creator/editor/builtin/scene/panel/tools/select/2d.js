const e=require("./utils"),t=Editor.require("scene://utils/node");module.exports={getIntersectionList(i,n){var o=cc.engine.getInstanceById(cc.engine.editingRootNode),c=!0;o||(c=!1,o=cc.director.getScene());var r=[],d=new cc.Vec2,l=new cc.Vec2,s=new cc.Vec2,u=new cc.Vec2,a=new Editor.Utils.Polygon([d,l,s,u]),f=new cc.Rect,g=new cc.Rect,v=cc.vmath.mat4.create();function h(e,t){if(t._getLocalBounds){var o=f;if(t._getLocalBounds(o),o.width<=0||o.height<=0)return null;e.getWorldMatrix(v),cc.engine.obbApplyMatrix(o,v,d,l,s,u);var c=g;if(Editor.Math.calculateMaxRect(c,d,l,s,u),n)return i.containsRect(c)?{aabb:c}:null;if(i.intersects(c)&&Editor.Utils.Intersection.rectPolygon(i,a))return{aabb:c,obb:a}}return t.gizmo&&t.gizmo.rectHitTest(i,n)?{}:null}return e.deepQueryChildren(o,c,function(e){if(e.activeInHierarchy&&!e.getComponent(cc.Canvas)){var o=function(e,o){if(0===o.width||0===o.height)return null;var c=t.getWorldBounds(e,o);if(n)return i.containsRect(c)?{aabb:c}:null;if(i.intersects(c)){var r=t.getWorldOrientedBounds(e,o),d=new Editor.Utils.Polygon(r);if(Editor.Utils.Intersection.rectPolygon(i,d))return{aabb:c,obb:d}}return null}(e,e.getContentSize());if(o)return o.node=e,r.push(o),void 0;for(var c=e._components,d=0,l=c.length;d<l;d++){var s=c[d];if(s.enabled&&(o=h(e,s))){o.node=e,r.push(o);break}}}}),r},hitTest(e,i){let n,o=_Scene.view.pixelToWorld(cc.v2(e,i)),c=Number.MAX_VALUE;return this.getIntersectionList(new cc.Rect(o.x,o.y,1,1)).forEach(e=>{let i=e.node;if(!i)return;let r=e.aabb||t.getWorldBounds(i),d=o.sub(r.center).magSqr();if(d-c<-1e-6&&!(i._objFlags&(cc.Object.Flags.LockedInEditor|cc.Object.Flags.HideInHierarchy))){let e=i;for(;e;){if(e._objFlags&cc.Object.Flags.LockedInEditor)return;e=e.parent}c=d,n=i}}),n},rectHitTest(e,t,i,n){let o=_Scene.view.pixelToWorld(cc.v2(e,t)),c=_Scene.view.pixelToWorld(cc.v2(e+i,t+n)),r=cc.Rect.fromMinMax(o,c),d=[];return this.getIntersectionList(r,!0).forEach(e=>{let t=e.node;if(!t||t._objFlags&cc.Object.Flags.LockedInEditor||t instanceof cc.PrivateNode)return;let i=t;for(;i;){if(i._objFlags&cc.Object.Flags.LockedInEditor)return;i=i.parent}d.push(t)}),d},onMouseDown(e){if(1===e.which){var t=!1,i=Editor.Selection.curSelection("node");(e.metaKey||e.ctrlKey)&&(t=!0);var n=e.offsetX,o=e.offsetY;Editor.UI.startDrag("default",e,function(e,c,r,d,l){if(!(d*d+l*l<4)){var s=n,u=o;d<0&&(s+=d,d=-d),l<0&&(u+=l,l=-l),_Scene.view.$.gizmosView.updateSelectRect(s,u,d,l);var a,f,g=this.rectHitTest(s,u,d,l);if(t)for(f=i.slice(),a=0;a<g.length;++a)-1===f.indexOf(g[a].uuid)&&f.push(g[a].uuid);else for(f=[],a=0;a<g.length;++a)f.push(g[a].uuid);Editor.Selection.select("node",f,!0,!1)}}.bind(this),function(e,c,r,d,l){if(d*d+l*l>=4)return Editor.Selection.confirm(),_Scene.view.$.gizmosView.fadeoutSelectRect(),void 0;var s=this.hitTest(n,o);return s?t?(-1===i.indexOf(s.uuid)?Editor.Selection.select("node",s.uuid,!1,!0):Editor.Selection.unselect("node",s.uuid,!0),void 0):(Editor.Selection.select("node",s.uuid,!0,!0),void 0):(Editor.Selection.clear("node"),void 0)}.bind(this))}},onMouseMove(e){var t=this.hitTest(e.offsetX,e.offsetY);t&&Editor.Selection.hover("node",t.uuid)},onMouseLeave(e){Editor.Selection.hover("node",null)}};