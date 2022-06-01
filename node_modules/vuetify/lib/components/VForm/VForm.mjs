import { createVNode as _createVNode } from "vue";
// Composables
import { createForm, makeFormProps } from "../../composables/form.mjs"; // Utilities

import { ref } from 'vue';
import { defineComponent, useRender } from "../../util/index.mjs";
import { useForwardRef } from "../../composables/forwardRef.mjs"; // Types

export const VForm = defineComponent({
  name: 'VForm',
  props: { ...makeFormProps()
  },
  emits: {
    'update:modelValue': val => true,
    submit: e => true
  },

  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const form = createForm(props);
    const formRef = ref();

    function onReset(e) {
      e.preventDefault();
      form.reset();
    }

    function onSubmit(_e) {
      const e = _e;
      const ready = form.validate();
      e.then = ready.then.bind(ready);
      e.catch = ready.catch.bind(ready);
      e.finally = ready.finally.bind(ready);
      emit('submit', e);

      if (!e.defaultPrevented) {
        ready.then(_ref2 => {
          let {
            valid
          } = _ref2;

          if (valid) {
            var _formRef$value;

            (_formRef$value = formRef.value) == null ? void 0 : _formRef$value.submit();
          }
        });
      }

      e.preventDefault();
    }

    useRender(() => {
      var _slots$default;

      return _createVNode("form", {
        "ref": formRef,
        "class": "v-form",
        "novalidate": true,
        "onReset": onReset,
        "onSubmit": onSubmit
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, form)]);
    });
    return useForwardRef(form, formRef);
  }

});
//# sourceMappingURL=VForm.mjs.map