// Composables
import { provideDefaults } from "../../composables/defaults.mjs"; // Utilities

import { defineComponent, toRefs } from 'vue'; // Types

export const VDefaultsProvider = defineComponent({
  name: 'VDefaultsProvider',
  props: {
    defaults: Object,
    reset: [Number, String],
    root: Boolean,
    scoped: Boolean
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      defaults,
      reset,
      root,
      scoped
    } = toRefs(props);
    provideDefaults(defaults, {
      reset,
      root,
      scoped
    });
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
    };
  }

});
//# sourceMappingURL=VDefaultsProvider.mjs.map