import { createVNode as _createVNode } from "vue";
// Styles
import "./VChipGroup.css"; // Composables

import { makeGroupProps, useGroup } from "../../composables/group.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, provideTheme } from "../../composables/theme.mjs";
import { makeVariantProps } from "../../composables/variant.mjs";
import { provideDefaults } from "../../composables/defaults.mjs"; // Utilities

import { deepEqual, defineComponent } from "../../util/index.mjs";
import { toRef } from 'vue'; // Types

export const VChipGroupSymbol = Symbol.for('vuetify:v-chip-group');
export const VChipGroup = defineComponent({
  name: 'VChipGroup',
  props: {
    column: Boolean,
    filter: Boolean,
    valueComparator: {
      type: Function,
      default: deepEqual
    },
    ...makeGroupProps({
      selectedClass: 'v-chip--selected'
    }),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'contained-text'
    })
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VChipGroupSymbol);
    provideDefaults({
      VChip: {
        color: toRef(props, 'color'),
        filter: toRef(props, 'filter'),
        variant: toRef(props, 'variant')
      }
    });
    return () => {
      var _slots$default;

      return _createVNode(props.tag, {
        "class": ['v-chip-group', {
          'v-chip-group--column': props.column
        }, themeClasses.value]
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })]
      });
    };
  }

});
//# sourceMappingURL=VChipGroup.mjs.map