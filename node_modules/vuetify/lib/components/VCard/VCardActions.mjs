import { createVNode as _createVNode } from "vue";
// Composables
import { provideDefaults } from "../../composables/defaults.mjs"; // Utility

import { defineComponent, useRender } from "../../util/index.mjs";
export const VCardActions = defineComponent({
  name: 'VCardActions',

  setup(_, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        variant: 'text'
      }
    });
    useRender(() => {
      var _slots$default;

      return _createVNode("div", {
        "class": "v-card-actions"
      }, [slots == null ? void 0 : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    });
    return {};
  }

});
//# sourceMappingURL=VCardActions.mjs.map