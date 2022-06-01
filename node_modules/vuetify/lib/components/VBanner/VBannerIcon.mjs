import { createVNode as _createVNode, mergeProps as _mergeProps, resolveDirective as _resolveDirective } from "vue";
// Components
import { makeVAvatarProps, VAvatar } from "../VAvatar/VAvatar.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VBannerIcon = defineComponent({
  name: 'VBannerIcon',
  props: makeVAvatarProps(),

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => _createVNode(VAvatar, _mergeProps({
      "class": "v-banner-icon"
    }, props), slots);
  }

});
//# sourceMappingURL=VBannerIcon.mjs.map