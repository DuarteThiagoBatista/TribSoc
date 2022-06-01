import { createVNode as _createVNode } from "vue";
// Composables
import { provideDefaults } from "../../composables/defaults.mjs"; // Utility

import { defineComponent, useRender } from "../../util/index.mjs";
export const VBannerActions = defineComponent({
  name: 'VBannerActions',
  props: {
    color: String,
    density: String
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        color: props.color,
        density: props.density,
        variant: 'text'
      }
    });
    useRender(() => {
      var _slots$default;

      return _createVNode("div", {
        "class": "v-banner-actions"
      }, [slots == null ? void 0 : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    });
    return {};
  }

});
//# sourceMappingURL=VBannerActions.mjs.map