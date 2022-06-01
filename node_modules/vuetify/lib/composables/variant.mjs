import { createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Composables
import { useColor } from "./color.mjs"; // Utilities

import { computed, unref } from 'vue';
import { getCurrentInstanceName, propsFactory } from "../util/index.mjs"; // Types

export const allowedVariants = ['outlined', 'plain', 'text', 'contained', 'contained-flat', 'contained-text'];
export function genOverlays(isClickable, name) {
  return _createVNode(_Fragment, null, [isClickable && _createVNode("div", {
    "class": `${name}__overlay`
  }, null), _createVNode("div", {
    "class": `${name}__underlay`
  }, null)]);
}
export const makeVariantProps = propsFactory({
  color: String,
  variant: {
    type: String,
    default: 'contained',
    validator: v => allowedVariants.includes(v)
  }
}, 'variant');
export function useVariant(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const variantClasses = computed(() => {
    const {
      variant
    } = unref(props);
    return `${name}--variant-${variant}`;
  });
  const {
    colorClasses,
    colorStyles
  } = useColor(computed(() => {
    const {
      variant,
      color
    } = unref(props);
    return {
      [['contained', 'contained-flat'].includes(variant) ? 'background' : 'text']: color
    };
  }));
  return {
    colorClasses,
    colorStyles,
    variantClasses
  };
}
//# sourceMappingURL=variant.mjs.map