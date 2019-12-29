"use strict";Vue.component("cc-physics-joint",{template:'\n    <ui-prop name="Connected Body" style="padding-top: 10px">\n      <ui-node class="flex-1"\n        type="cc.RigidBody"\n        typename="RigidBody"\n        v-value="target.connectedBody.value.uuid"\n      >\n      </ui-node>\n      <ui-button\n        class="blue tiny"\n        @confirm="lastRigidBody"\n      >\n        Last\n      </ui-button>\n      <ui-button\n        class="blue tiny"\n        @confirm="nextRigidBody"\n      >\n        Next\n      </ui-button>\n    </ui-prop>\n    <template v-for="prop in target">\n      <component\n        v-if="prop.attrs.visible !== false && prop.name !== \'Connected Body\'"\n        :is="prop.compType"\n        :target.sync="prop"\n        :indent="0"\n      ></component>\n    </template>\n  ',props:{target:{twoWay:!0,type:Object}},methods:{T:Editor.T,lastRigidBody(){Editor.Ipc.sendToPanel("scene","scene:choose-last-rigid-body",this.target.uuid.value)},nextRigidBody(){Editor.Ipc.sendToPanel("scene","scene:choose-next-rigid-body",this.target.uuid.value)}}});var n={dependencies:["packages://inspector/inspectors/comps/physics/joint.js"],template:'\n    <cc-physics-joint :target.sync="target"></cc-physics-joint>\n  ',props:{target:{twoWay:!0,type:Object}}};Vue.component("cc-distance-joint",n),Vue.component("cc-revolute-joint",n),Vue.component("cc-motor-joint",n),Vue.component("cc-prismatic-joint",n),Vue.component("cc-rope-joint",n),Vue.component("cc-weld-joint",n),Vue.component("cc-wheel-joint",n);