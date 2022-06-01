import { createVNode as _createVNode } from "vue";
// Styles
import "./VColorPickerPreview.css"; // Components

import { VSlider } from "../VSlider/index.mjs"; // Utilities

import { defineComponent, HSVAtoCSS } from "../../util/index.mjs";
import { nullColor } from "./util/index.mjs"; // Types

export const VColorPickerPreview = defineComponent({
  name: 'VColorPickerPreview',
  props: {
    color: {
      type: Object
    },
    disabled: Boolean,
    hideAlpha: Boolean
  },
  emits: {
    'update:color': color => true
  },

  setup(props, _ref) {
    let {
      emit
    } = _ref;
    return () => {
      var _props$color, _props$color2, _props$color4;

      return _createVNode("div", {
        "class": ['v-color-picker-preview', {
          'v-color-picker-preview--hide-alpha': props.hideAlpha
        }]
      }, [_createVNode("div", {
        "class": "v-color-picker-preview__dot"
      }, [_createVNode("div", {
        "style": {
          background: HSVAtoCSS((_props$color = props.color) != null ? _props$color : nullColor)
        }
      }, null)]), _createVNode("div", {
        "class": "v-color-picker-preview__sliders"
      }, [_createVNode(VSlider, {
        "class": "v-color-picker-preview__track v-color-picker-preview__hue",
        "modelValue": (_props$color2 = props.color) == null ? void 0 : _props$color2.h,
        "onUpdate:modelValue": h => {
          var _props$color3;

          return emit('update:color', { ...((_props$color3 = props.color) != null ? _props$color3 : nullColor),
            h
          });
        },
        "step": 0,
        "min": 0,
        "max": 360,
        "disabled": props.disabled,
        "thumbSize": 14,
        "trackSize": 8,
        "trackFillColor": "white",
        "hideDetails": true
      }, null), !props.hideAlpha && _createVNode(VSlider, {
        "class": "v-color-picker-preview__track v-color-picker-preview__alpha",
        "modelValue": (_props$color4 = props.color) == null ? void 0 : _props$color4.a,
        "onUpdate:modelValue": a => {
          var _props$color5;

          return emit('update:color', { ...((_props$color5 = props.color) != null ? _props$color5 : nullColor),
            a
          });
        },
        "step": 0,
        "min": 0,
        "max": 1,
        "disabled": props.disabled,
        "thumbSize": 14,
        "trackSize": 8,
        "trackFillColor": "white",
        "hideDetails": true
      }, null)])]);
    };
  }

});
//# sourceMappingURL=VColorPickerPreview.mjs.map