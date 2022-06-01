import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Composables
import { makeRouterProps, useLink } from "../../composables/router.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { useTextColor } from "../../composables/color.mjs"; // Utilities

import { computed } from 'vue';
import { defineComponent, useRender } from "../../util/index.mjs";
export const VBreadcrumbsItem = defineComponent({
  name: 'VBreadcrumbsItem',
  props: {
    active: Boolean,
    activeClass: String,
    activeColor: String,
    color: String,
    disabled: Boolean,
    text: String,
    ...makeRouterProps(),
    ...makeTagProps({
      tag: 'li'
    })
  },

  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _link$isExactActive;

      return props.active || ((_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value);
    });
    const color = computed(() => isActive.value ? props.activeColor : props.color);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    useRender(() => {
      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasText = !!(slots.default || props.text);
      return _createVNode(Tag, {
        "class": ['v-breadcrumbs-item', {
          'v-breadcrumbs-item--active': isActive.value,
          'v-breadcrumbs-item--disabled': props.disabled,
          'v-breadcrumbs-item--link': link.isLink.value,
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, textColorClasses.value],
        "style": [textColorStyles.value],
        "href": link.href.value,
        "aria-current": isActive.value ? 'page' : undefined,
        "onClick": link.navigate
      }, {
        default: hasText ? () => {
          var _slots$default, _slots$default2;

          return (_slots$default = (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)) != null ? _slots$default : props.text;
        } : undefined
      });
    });
    return {};
  }

});
//# sourceMappingURL=VBreadcrumbsItem.mjs.map