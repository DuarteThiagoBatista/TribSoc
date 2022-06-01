import { createVNode as _createVNode } from "vue";
// Styles
import "./VBtnToggle.css"; // Components

import { VBtnGroup } from "../VBtnGroup/index.mjs"; // Composables

import { makeGroupProps, useGroup } from "../../composables/group.mjs"; // Utility

import { genericComponent, useRender } from "../../util/index.mjs"; // Types

export const VBtnToggleSymbol = Symbol.for('vuetify:v-btn-toggle');
export const VBtnToggle = genericComponent()({
  name: 'VBtnToggle',
  props: makeGroupProps({
    selectedClass: 'v-btn--selected'
  }),
  emits: {
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      next,
      prev,
      select,
      selected
    } = useGroup(props, VBtnToggleSymbol);
    useRender(() => {
      var _slots$default;

      return _createVNode(VBtnGroup, {
        "class": "v-btn-toggle"
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          isSelected,
          next,
          prev,
          select,
          selected
        })]
      });
    });
    return {
      next,
      prev,
      select
    };
  }

});
//# sourceMappingURL=VBtnToggle.mjs.map