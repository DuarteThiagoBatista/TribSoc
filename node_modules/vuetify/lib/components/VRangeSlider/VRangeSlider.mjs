import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
// Styles
import "../VSlider/VSlider.css"; // Components

import { VInput } from "../VInput/index.mjs";
import { VSliderThumb } from "../VSlider/VSliderThumb.mjs";
import { VSliderTrack } from "../VSlider/VSliderTrack.mjs"; // Composables

import { getOffset, makeSliderProps, useSlider } from "../VSlider/slider.mjs";
import { makeFocusProps, useFocus } from "../../composables/focus.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utilities

import { computed, ref } from 'vue';
import { defineComponent } from "../../util/index.mjs"; // Types

import { filterInputProps, makeVInputProps } from "../VInput/VInput.mjs";
export const VRangeSlider = defineComponent({
  name: 'VRangeSlider',
  props: { ...makeFocusProps(),
    ...makeVInputProps(),
    ...makeSliderProps(),
    strict: Boolean,
    modelValue: {
      type: Array,
      default: () => [0, 0]
    }
  },
  emits: {
    'update:focused': value => true,
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const startThumbRef = ref();
    const stopThumbRef = ref();
    const inputRef = ref();

    function getActiveThumb(e) {
      if (!startThumbRef.value || !stopThumbRef.value) return;
      const startOffset = getOffset(e, startThumbRef.value.$el, props.direction);
      const stopOffset = getOffset(e, stopThumbRef.value.$el, props.direction);
      const a = Math.abs(startOffset);
      const b = Math.abs(stopOffset);
      return a < b || a === b && startOffset < 0 ? startThumbRef.value.$el : stopThumbRef.value.$el;
    }

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
      activeThumbRef
    } = useSlider({
      /* eslint-disable @typescript-eslint/no-use-before-define */
      props,
      handleSliderMouseUp: newValue => {
        var _startThumbRef$value;

        model.value = activeThumbRef.value === ((_startThumbRef$value = startThumbRef.value) == null ? void 0 : _startThumbRef$value.$el) ? [newValue, model.value[1]] : [model.value[0], newValue];
      },
      handleMouseMove: newValue => {
        var _startThumbRef$value3;

        const [start, stop] = model.value;

        if (!props.strict && start === stop && start !== min.value) {
          var _stopThumbRef$value, _startThumbRef$value2, _activeThumbRef$value;

          activeThumbRef.value = newValue > start ? (_stopThumbRef$value = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value.$el : (_startThumbRef$value2 = startThumbRef.value) == null ? void 0 : _startThumbRef$value2.$el;
          (_activeThumbRef$value = activeThumbRef.value) == null ? void 0 : _activeThumbRef$value.focus();
        }

        if (activeThumbRef.value === ((_startThumbRef$value3 = startThumbRef.value) == null ? void 0 : _startThumbRef$value3.$el)) {
          model.value = [Math.min(newValue, stop), stop];
        } else {
          model.value = [start, Math.max(start, newValue)];
        }
      },
      getActiveThumb
      /* eslint-enable @typescript-eslint/no-use-before-define */

    });
    const model = useProxiedModel(props, 'modelValue', undefined, arr => {
      if (!arr || !arr.length) return [0, 0];
      return arr.map(value => roundValue(value));
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStart = computed(() => position(model.value[0]));
    const trackStop = computed(() => position(model.value[1]));
    return () => {
      const [inputProps, _] = filterInputProps(props);
      return _createVNode(VInput, _mergeProps({
        "class": ['v-slider', 'v-range-slider', {
          'v-slider--has-labels': !!slots['tick-label'] || hasLabels.value,
          'v-slider--focused': isFocused.value,
          'v-slider--pressed': mousePressed.value,
          'v-slider--disabled': props.disabled
        }],
        "ref": inputRef
      }, inputProps, {
        "focused": isFocused.value
      }), { ...slots,
        default: _ref2 => {
          var _startThumbRef$value4, _stopThumbRef$value4;

          let {
            id
          } = _ref2;
          return _createVNode("div", {
            "class": "v-slider__container",
            "onMousedown": onSliderMousedown,
            "onTouchstartPassive": onSliderTouchstart
          }, [_createVNode("input", {
            "id": `${id.value}_start`,
            "name": props.name || id.value,
            "disabled": props.disabled,
            "readonly": props.readonly,
            "tabindex": "-1",
            "value": model.value[0]
          }, null), _createVNode("input", {
            "id": `${id.value}_stop`,
            "name": props.name || id.value,
            "disabled": props.disabled,
            "readonly": props.readonly,
            "tabindex": "-1",
            "value": model.value[1]
          }, null), _createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": trackStart.value,
            "stop": trackStop.value
          }, {
            'tick-label': slots['tick-label']
          }), _createVNode(VSliderThumb, {
            "ref": startThumbRef,
            "focused": isFocused && activeThumbRef.value === ((_startThumbRef$value4 = startThumbRef.value) == null ? void 0 : _startThumbRef$value4.$el),
            "modelValue": model.value[0],
            "onUpdate:modelValue": v => model.value = [v, model.value[1]],
            "onFocus": e => {
              var _startThumbRef$value5, _stopThumbRef$value2;

              focus();
              activeThumbRef.value = (_startThumbRef$value5 = startThumbRef.value) == null ? void 0 : _startThumbRef$value5.$el; // Make sure second thumb is focused if
              // the thumbs are on top of each other
              // and they are both at minimum value
              // but only if focused from outside.

              if (model.value[0] === model.value[1] && model.value[1] === min.value && e.relatedTarget !== ((_stopThumbRef$value2 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value2.$el)) {
                var _startThumbRef$value6, _stopThumbRef$value3;

                (_startThumbRef$value6 = startThumbRef.value) == null ? void 0 : _startThumbRef$value6.$el.blur();
                (_stopThumbRef$value3 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value3.$el.focus();
              }
            },
            "onBlur": () => {
              blur();
              activeThumbRef.value = undefined;
            },
            "min": min.value,
            "max": model.value[1],
            "position": trackStart.value
          }, {
            'thumb-label': slots['thumb-label']
          }), _createVNode(VSliderThumb, {
            "ref": stopThumbRef,
            "focused": isFocused && activeThumbRef.value === ((_stopThumbRef$value4 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value4.$el),
            "modelValue": model.value[1],
            "onUpdate:modelValue": v => model.value = [model.value[0], v],
            "onFocus": e => {
              var _stopThumbRef$value5, _startThumbRef$value7;

              focus();
              activeThumbRef.value = (_stopThumbRef$value5 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value5.$el; // Make sure first thumb is focused if
              // the thumbs are on top of each other
              // and they are both at maximum value
              // but only if focused from outside.

              if (model.value[0] === model.value[1] && model.value[0] === max.value && e.relatedTarget !== ((_startThumbRef$value7 = startThumbRef.value) == null ? void 0 : _startThumbRef$value7.$el)) {
                var _stopThumbRef$value6, _startThumbRef$value8;

                (_stopThumbRef$value6 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value6.$el.blur();
                (_startThumbRef$value8 = startThumbRef.value) == null ? void 0 : _startThumbRef$value8.$el.focus();
              }
            },
            "onBlur": () => {
              blur();
              activeThumbRef.value = undefined;
            },
            "min": model.value[0],
            "max": max.value,
            "position": trackStop.value
          }, {
            'thumb-label': slots['thumb-label']
          })]);
        }
      });
    };
  }

});
//# sourceMappingURL=VRangeSlider.mjs.map