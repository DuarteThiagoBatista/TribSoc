// Utilities
import { nextTick, watch } from 'vue'; // Types

export function useSelectLink(link, select) {
  watch(() => {
    var _link$isExactActive;

    return (_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value;
  }, isExactActive => {
    if (link.isLink.value && isExactActive && select) {
      nextTick(() => {
        select(true);
      });
    }
  }, {
    immediate: true
  });
}
//# sourceMappingURL=selectLink.mjs.map