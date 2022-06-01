import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
// Styles
import "./VSlider.css"; // Components

import { VInput } from "../VInput/index.mjs";
import { VSliderThumb } from "./VSliderThumb.mjs";
import { VSliderTrack } from "./VSliderTrack.mjs"; // Composables

import { makeFocusProps, useFocus } from "../../composables/focus.mjs";
import { makeSliderProps, useSlider } from "./slider.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Helpers

import { defineComponent } from "../../util/index.mjs"; // Types

import { computed, ref } from 'vue';
import { filterInputProps, makeVInputProps } from "../VInput/VInput.mjs";
export const VSlider = defineComponent({
  name: 'VSlider',
  props: { ...makeFocusProps(),
    ...makeSliderProps(),
    ...makeVInputProps(),
    modelValue: {
      type: [Number, String],
      default: 0
    }
  },
  emits: {
    'update:focused': value => true,
    'update:modelValue': v => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const thumbContainerRef = ref();
    const {
      min,
      max,
      mousePressed,
      roundValue,
      onSliderMousedown,
      onSliderTouchstart,
      trackContainerRef,
      position,
      hasLabels,
      readonly
    } = useSlider({
      props,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleSliderMouseUp: newValue => model.value = roundValue(newValue),
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleMouseMove: newValue => model.value = roundValue(newValue),
      getActiveThumb: () => {
        var _thumbContainerRef$va;

        return (_thumbContainerRef$va = thumbContainerRef.value) == null ? void 0 : _thumbContainerRef$va.$el;
      }
    });
    const model = useProxiedModel(props, 'modelValue', undefined, v => {
      const value = typeof v === 'string' ? parseFloat(v) : v == null ? min.value : v;
      return roundValue(value);
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStop = computed(() => position(model.value));
    return () => {
      const [inputProps, _] = filterInputProps(props);
      return _createVNode(VInput, _mergeProps({
        "class": ['v-slider', {
          'v-slider--has-labels': !!slots['tick-label'] || hasLabels.value,
          'v-slider--focused': isFocused.value,
          'v-slider--pressed': mousePressed.value,
          'v-slider--disabled': props.disabled
        }]
      }, inputProps, {
        "focused": isFocused.value
      }), { ...slots,
        default: _ref2 => {
          let {
            id
          } = _ref2;
          return _createVNode("div", {
            "class": "v-slider__container",
            "onMousedown": !readonly.value ? onSliderMousedown : undefined,
            "onTouchstartPassive": !readonly.value ? onSliderTouchstart : undefined
          }, [_createVNode("input", {
            "id": id.value,
            "name": props.name || id.value,
            "disabled": props.disabled,
            "readonly": props.readonly,
            "tabindex": "-1",
            "value": model.value
          }, null), _createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": 0,
            "stop": trackStop.value
          }, {
            'tick-label': slots['tick-label']
          }), _createVNode(VSliderThumb, {
            "ref": thumbContainerRef,
            "focused": isFocused.value,
            "min": min.value,
            "max": max.value,
            "modelValue": model.value,
            "onUpdate:modelValue": v => model.value = v,
            "position": trackStop.value,
            "elevation": props.elevation,
            "onFocus": focus,
            "onBlur": blur
          }, {
            'thumb-label': slots['thumb-label']
          })]);
        }
      });
    };
  }

});
//# sourceMappingURL=VSlider.mjs.map