import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Composables
import { makeTagProps } from "../../composables/tag.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VListItemAction = defineComponent({
  name: 'VListItemAction',
  props: {
    start: Boolean,
    end: Boolean,
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      return _createVNode(props.tag, {
        "class": ['v-list-item-action', {
          'v-list-item-action--start': props.start,
          'v-list-item-action--end': props.end
        }]
      }, slots);
    };
  }

});
//# sourceMappingURL=VListItemAction.mjs.map