import { createVNode as _createVNode } from "vue";
// Components
import { makeVExpansionPanelTitleProps, VExpansionPanelTitle } from "./VExpansionPanelTitle.mjs";
import { VExpansionPanelText } from "./VExpansionPanelText.mjs";
import { VExpansionPanelSymbol } from "./VExpansionPanels.mjs"; // Composables

import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makeGroupItemProps, useGroupItem } from "../../composables/group.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { useBackgroundColor } from "../../composables/color.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeLazyProps } from "../../composables/lazy.mjs"; // Utilities

import { computed, provide } from 'vue';
import { defineComponent, useRender } from "../../util/index.mjs";
export const VExpansionPanel = defineComponent({
  name: 'VExpansionPanel',
  props: {
    title: String,
    text: String,
    bgColor: String,
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeLazyProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeVExpansionPanelTitleProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const groupItem = useGroupItem(props, VExpansionPanelSymbol);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, 'bgColor');
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const isDisabled = computed(() => (groupItem == null ? void 0 : groupItem.disabled.value) || props.disabled);
    const selectedIndices = computed(() => groupItem.group.items.value.reduce((arr, item, index) => {
      if (groupItem.group.selected.value.includes(item.id)) arr.push(index);
      return arr;
    }, []));
    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some(selectedIndex => selectedIndex - index === 1);
    });
    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some(selectedIndex => selectedIndex - index === -1);
    });
    provide(VExpansionPanelSymbol, groupItem);
    useRender(() => {
      var _slots$default;

      const hasText = !!(slots.text || props.text);
      const hasTitle = !!(slots.title || props.title);
      return _createVNode(props.tag, {
        "class": ['v-expansion-panel', {
          'v-expansion-panel--active': groupItem.isSelected.value,
          'v-expansion-panel--before-active': isBeforeSelected.value,
          'v-expansion-panel--after-active': isAfterSelected.value,
          'v-expansion-panel--disabled': isDisabled.value
        }, roundedClasses.value, backgroundColorClasses.value],
        "style": backgroundColorStyles.value,
        "aria-expanded": groupItem.isSelected.value
      }, {
        default: () => [_createVNode("div", {
          "class": ['v-expansion-panel__shadow', ...elevationClasses.value]
        }, null), hasTitle && _createVNode(VExpansionPanelTitle, {
          "collapseIcon": props.collapseIcon,
          "color": props.color,
          "expandIcon": props.expandIcon,
          "hideActions": props.hideActions,
          "ripple": props.ripple
        }, {
          default: () => [slots.title ? slots.title() : props.title]
        }), hasText && _createVNode(VExpansionPanelText, {
          "eager": props.eager
        }, {
          default: () => [slots.text ? slots.text() : props.text]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      });
    });
    return {};
  }

});
//# sourceMappingURL=VExpansionPanel.mjs.map