(()=>{"use strict";return{dependencies:["packages://inspector/share/meta-header.js","packages://inspector/share/image-preview.js","packages://inspector/share/sprite-section.js","packages://inspector/share/texture-compress-section.js"],template:'\n      <cc-meta-header\n        :target="target"\n        :icon="thumbnail()"\n      ></cc-meta-header>\n\n      <div class="props flex-1">\n        <ui-prop name="Type" type="enum" v-value="target.type">\n          <option value="raw">Raw</option>\n          <option value="sprite">Sprite</option>\n        </ui-prop>\n\n        <ui-prop name="Premultiply Alpha" type="boolean" v-value="target.premultiplyAlpha"></ui-prop>\n\n        <ui-prop name="Wrap Mode" type="enum" v-value="target.wrapMode">\n          <option value="clamp">Clamp</option>\n          <option value="repeat">Repeat</option>\n        </ui-prop>\n\n        <ui-prop name="Filter Mode" type="enum" v-value="target.filterMode">\n          <option value="point">Point</option>\n          <option value="bilinear">Bilinear</option>\n          <option value="trilinear">Trilinear</option>\n        </ui-prop>\n\n        <ui-prop name="Gen Mipmaps" type="boolean" v-value="target.genMipmaps">\n        </ui-prop>\n\n        <ui-prop name="Packable" type="boolean" v-value="target.packable">\n        </ui-prop>\n\n        <texture-compress v-ref:preview\n          :target.sync="target"\n        >\n        </texture-compress>\n\n        <ui-section v-if="target.type === \'sprite\'">\n          <div class="header">Sprite</div>\n          <cc-sprite-section :target.sync="target.subMetas[0]"></cc-sprite-section>\n        </ui-section>\n      </div>\n\n      <cc-image-preview v-ref:preview\n        :target="target"\n        :uuid="target.uuid"\n      >\n      </cc-image-preview>\n    ',ready(){},data:{currentPlatfrom:"default"},methods:{resize(){this.$refs.preview.resize()},thumbnail(){return this.target.uuid?`thumbnail://${this.target.uuid}?32&ts=`+Date.now():""},changePlatform(e){this.currentPlatfrom=e},activeClass(e){return this.currentPlatfrom===e?"active":""}}}})();