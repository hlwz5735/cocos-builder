"use strict";Vue.component("cc-scrollview",{template:'\n        <ui-prop\n            v-prop="target.content"\n            :multi-values="multi"\n        ></ui-prop>\n        <div v-if="target.content.value.uuid">\n            <ui-prop\n                v-prop="target.horizontal"\n                :multi-values="multi"\n            ></ui-prop>\n            <ui-prop\n                v-prop="target.vertical"\n                :multi-values="multi"\n            ></ui-prop>\n            <ui-prop\n                v-prop="target.inertia"\n                :multi-values="multi"\n            ></ui-prop>\n            <ui-prop\n                v-if="target.inertia.value"\n                v-prop="target.brake"\n                :multi-values="multi"\n            ></ui-prop>    \n            <ui-prop\n                v-prop="target.elastic"\n                :multi-values="multi"\n            ></ui-prop>\n            <ui-prop\n                v-if="target.elastic.value"\n                v-prop="target.bounceDuration"\n                :multi-values="multi"\n            ></ui-prop>\n            <ui-prop\n                v-if="target.horizontal.value"\n                v-prop="target.horizontalScrollBar"\n                :multi-values="multi"\n            ></ui-prop>\n            <ui-prop\n                v-if="target.vertical.value"\n                v-prop="target.verticalScrollBar"\n                :multi-values="multi"\n            ></ui-prop>\n            <cc-array-prop :target.sync="target.scrollEvents"></cc-array-prop>\n            <ui-prop \n                v-prop="target.cancelInnerEvents"\n                :multi-values="multi"\n            ></ui-prop>\n        </div>\n  ',props:{target:{twoWay:!0,type:Object},multi:{type:Boolean}}});