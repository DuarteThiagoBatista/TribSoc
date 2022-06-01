// Composables
import { makeGroupItemProps, useGroupItem } from "../../composables/group.mjs";
import { VSlideGroupSymbol } from "./VSlideGroup.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VSlideGroupItem = defineComponent({
  name: 'VSlideGroupItem',
  props: { ...makeGroupItemProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const slideGroupItem = useGroupItem(props, VSlideGroupSymbol);
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
        isSelected: slideGroupItem.isSelected.value,
        select: slideGroupItem.select,
        toggle: slideGroupItem.toggle,
        selectedClass: slideGroupItem.selectedClass.value
      });
    };
  }

});
//# sourceMappingURL=VSlideGroupItem.mjs.map