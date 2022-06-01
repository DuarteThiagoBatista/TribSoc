import { withDirectives as _withDirectives, mergeProps as _mergeProps, resolveDirective as _resolveDirective, vModelText as _vModelText, createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Styles
import "./VTextarea.css"; // Components

import { filterFieldProps, makeVFieldProps } from "../VField/VField.mjs";
import { filterInputProps, makeVInputProps, VInput } from "../VInput/VInput.mjs";
import { VCounter } from "../VCounter/index.mjs";
import { VField } from "../VField/index.mjs"; // Composables

import { useForwardRef } from "../../composables/forwardRef.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Directives

import Intersect from "../../directives/intersect/index.mjs"; // Utilities

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { convertToUnit, defineComponent, filterInputAttrs, useRender } from "../../util/index.mjs"; // Types

export const VTextarea = defineComponent({
  name: 'VTextarea',
  directives: {
    Intersect
  },
  inheritAttrs: false,
  props: {
    autoGrow: Boolean,
    autofocus: Boolean,
    counter: [Boolean, Number, String],
    counterValue: Function,
    hint: String,
    persistentHint: Boolean,
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    persistentCounter: Boolean,
    noResize: Boolean,
    rows: {
      type: [Number, String],
      default: 5,
      validator: v => !isNaN(parseFloat(v))
    },
    maxRows: {
      type: [Number, String],
      validator: v => !isNaN(parseFloat(v))
    },
    suffix: String,
    ...makeVInputProps(),
    ...makeVFieldProps()
  },
  emits: {
    'click:clear': e => true,
    'click:control': e => true,
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value) : (model.value || '').toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== 'number' && typeof props.counter !== 'string') return undefined;
      return props.counter;
    });

    function onIntersect(isIntersecting, entries) {
      var _entries$0$target, _entries$0$target$foc;

      if (!props.autofocus || !isIntersecting) return;
      (_entries$0$target = entries[0].target) == null ? void 0 : (_entries$0$target$foc = _entries$0$target.focus) == null ? void 0 : _entries$0$target$foc.call(_entries$0$target);
    }

    const vInputRef = ref();
    const vFieldRef = ref();
    const isFocused = ref(false);
    const controlHeight = ref('auto');
    const textareaRef = ref();
    const isActive = computed(() => isFocused.value || props.persistentPlaceholder);
    const messages = computed(() => {
      return props.messages.length ? props.messages : isActive.value || props.persistentHint ? props.hint : '';
    });

    function onFocus() {
      if (textareaRef.value !== document.activeElement) {
        var _textareaRef$value;

        (_textareaRef$value = textareaRef.value) == null ? void 0 : _textareaRef$value.focus();
      }

      if (!isFocused.value) isFocused.value = true;
    }

    function onControlClick(e) {
      onFocus();
      emit('click:control', e);
    }

    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = '';
        emit('click:clear', e);
      });
    }

    const sizerRef = ref();

    function calculateInputHeight() {
      if (!props.autoGrow) return;
      nextTick(() => {
        if (!sizerRef.value) return;
        const style = getComputedStyle(sizerRef.value);
        const padding = parseFloat(style.getPropertyValue('--v-field-padding-top')) + parseFloat(style.getPropertyValue('--v-field-padding-bottom'));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = parseFloat(props.rows) * lineHeight + padding;
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        controlHeight.value = convertToUnit(Math.min(maxHeight, Math.max(minHeight, height != null ? height : 0)));
      });
    }

    onMounted(calculateInputHeight);
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    let observer;
    watch(sizerRef, val => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        var _observer;

        (_observer = observer) == null ? void 0 : _observer.disconnect();
      }
    });
    onBeforeUnmount(() => {
      var _observer2;

      (_observer2 = observer) == null ? void 0 : _observer2.disconnect();
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [{
        modelValue: _,
        ...inputProps
      }] = filterInputProps(props);
      const [fieldProps] = filterFieldProps(props);
      return _createVNode(VInput, _mergeProps({
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": ['v-textarea', {
          'v-textarea--prefixed': props.prefix,
          'v-textarea--suffixed': props.suffix,
          'v-textarea--auto-grow': props.autoGrow,
          'v-textarea--no-resize': props.noResize || props.autoGrow
        }]
      }, rootAttrs, inputProps, {
        "messages": messages.value
      }), { ...slots,
        default: _ref2 => {
          let {
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref2;
          return _createVNode(VField, _mergeProps({
            "style": {
              '--v-input-control-height': controlHeight.value
            },
            "onClick:control": onControlClick,
            "onClick:clear": onClear,
            "role": "textbox"
          }, fieldProps, {
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), { ...slots,
            default: _ref3 => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return _createVNode(_Fragment, null, [props.prefix && _createVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), _withDirectives(_createVNode("textarea", _mergeProps({
                "ref": textareaRef,
                "class": fieldClass,
                "onUpdate:modelValue": $event => model.value = $event,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": props.name,
                "onFocus": onFocus,
                "onBlur": () => isFocused.value = false
              }, slotProps, inputAttrs), null), [[_vModelText, model.value], [_resolveDirective("intersect"), {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && _withDirectives(_createVNode("textarea", {
                "class": [fieldClass, 'v-textarea__sizer'],
                "onUpdate:modelValue": $event => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[_vModelText, model.value]]), props.suffix && _createVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasCounter ? () => _createVNode(_Fragment, null, [_createVNode("span", null, null), _createVNode(VCounter, {
          "active": props.persistentCounter || isFocused.value,
          "value": counterValue.value,
          "max": max.value
        }, slots.counter)]) : undefined
      });
    });
    return useForwardRef({}, vInputRef, vFieldRef, textareaRef);
  }

});
//# sourceMappingURL=VTextarea.mjs.map