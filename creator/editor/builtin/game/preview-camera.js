class e extends cc.Component{constructor(){super();const e=Editor.require("unpack://engine-dev/cocos2d/renderer/scene/scene");this._scene=new e;const t=Editor.require("unpack://engine-dev/cocos2d/core/assets/CCRenderTexture");(this._renderTexture=new t).initWithSize(1,1,cc.gfx.RB_FMT_D24S8),this._canvas=document.createElement("canvas"),this._canvas.style.transform="scaleY(-1);",this._ctx=null,this._imageData=null,this._data=null,this._cameras=[],this._runningScene=null}get canvas(){return this._canvas}set canvas(e){this._canvas=e,this._updateCanvas()}get cameras(){return this._cameras}set cameras(e){this._cameras=e}getBase64Data(){return this._dataDirty?(this._dataDirty=!1,this._canvas.toDataURL()):""}getBinaryData(){return this._dataDirty?(this._dataDirty=!1,this._data):null}_updateCanvas(){if(!this._renderTexture)return;let{width:e,height:t}=this._renderTexture;0!==e&&0!==t&&(this._ctx=this._canvas.getContext("2d"),this._canvas.width=e,this._canvas.height=t,this._imageData=this._ctx.getImageData(0,0,e,t))}_updateRenderTexture(){let{width:e,height:t}=cc.engine.getDesignResolutionSize(),a=this._renderTexture;a.width===e&&a.height===t||(a.updateSize(e,t),this._data=new Uint8Array(e*t*4),this._updateCanvas())}update(e){if(this._runningScene!==cc.director.getScene())return this._runningScene=cc.director.getScene(),void 0;if(0===this._cameras.length)return;this._updateRenderTexture();let t=this._renderTexture,a=[],s=this._cameras;for(let e=0;e<s.length;e++){let r=s[e];a[e]=r.targetTexture,r.targetTexture=t,r.beforeDraw(),this._scene.addCamera(r._camera)}this._scene._models=cc.renderer.scene._models,this._scene._lights=cc.renderer.scene._lights,cc.renderer._forward.render(this._scene);let r=t.readPixels(this._data);this._imageData.data.set(r),this._ctx.putImageData(this._imageData,0,0);for(let e=0;e<s.length;e++){let t=s[e];t.targetTexture=a[e],this._scene.removeCamera(t._camera)}this._dataDirty=!0}}e._executeInEditMode=!0,module.exports=e;