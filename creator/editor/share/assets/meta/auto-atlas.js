"use strict";const t=require("fire-path"),s=Editor.metas["custom-asset"];module.exports=class extends s{constructor(t){super(t),this.maxWidth=1024,this.maxHeight=1024,this.padding=2,this.allowRotation=!0,this.forceSquared=!1,this.powerOfTwo=!1,this.algorithm="MaxRects",this.format="png",this.quality=80,this.contourBleed=!0,this.paddingBleed=!0,this.filterUnused=!1,this.packable=!1,this.premultiplyAlpha=!1,this.filterMode="bilinear",this.platformSettings={}}static defaultType(){return"auto-atlas"}static version(){return"1.2.0"}import(s,i){var e={__type__:"cc.SpriteAtlas"};Editor.serialize.setName(e,t.basenameNoExt(s)),this._assetdb.saveAssetToLibrary(this.uuid,e),i&&i()}};