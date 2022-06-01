// Composables
import { makeVariantProps } from "../../composables/variant.mjs";
import { provideDefaults } from "../../composables/defaults.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
import { toRef } from 'vue';
export const VToolbarItems = defineComponent({
  name: 'VToolbarItems',
  props: { ...makeVariantProps({
      variant: 'contained-text'
    })
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        color: toRef(props, 'color'),
        variant: toRef(props, 'variant')
      }
    });
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
    };
  }

});
//# sourceMappingURL=VToolbarItems.mjs.map