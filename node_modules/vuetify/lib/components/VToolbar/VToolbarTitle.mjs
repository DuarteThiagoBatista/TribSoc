import { createVNode as _createVNode } from "vue";
// Composables
import { makeTagProps } from "../../composables/tag.mjs"; // Utilities

import { genericComponent, useRender } from "../../util/index.mjs"; // Types

export const VToolbarTitle = genericComponent()({
  name: 'VToolbarTitle',
  props: {
    text: String,
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _slots$default;

      const hasText = !!(slots.default || slots.text || props.text);
      return _createVNode(props.tag, {
        "class": "v-toolbar-title"
      }, {
        default: () => [hasText && _createVNode("div", {
          "class": "v-toolbar-title__placeholder"
        }, [slots.text ? slots.text() : props.text, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]
      });
    });
    return {};
  }

});
//# sourceMappingURL=VToolbarTitle.mjs.map