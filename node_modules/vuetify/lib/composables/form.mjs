// Utilities
import { computed, inject, provide, ref, watch } from 'vue';
import { useProxiedModel } from "./proxiedModel.mjs";
import { consoleWarn, propsFactory } from "../util/index.mjs"; // Types

export const FormKey = Symbol.for('vuetify:form');
export const makeFormProps = propsFactory({
  disabled: Boolean,
  fastFail: Boolean,
  lazyValidation: Boolean,
  readonly: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  }
});
export function createForm(props) {
  const model = useProxiedModel(props, 'modelValue');
  const isDisabled = computed(() => props.disabled);
  const isReadonly = computed(() => props.readonly);
  const isValidating = ref(false);
  const items = ref([]);
  const errorMessages = ref([]);

  async function validate() {
    const results = [];
    let valid = true;
    errorMessages.value = [];
    isValidating.value = true;

    for (const item of items.value) {
      const itemErrorMessages = await item.validate();

      if (itemErrorMessages.length > 0) {
        valid = false;
        results.push({
          id: item.id,
          errorMessages: itemErrorMessages
        });
      }

      if (!valid && props.fastFail) break;
    }

    errorMessages.value = results;
    isValidating.value = false;
    return {
      valid,
      errorMessages: errorMessages.value
    };
  }

  function reset() {
    items.value.forEach(item => item.reset());
    model.value = null;
  }

  function resetValidation() {
    items.value.forEach(item => item.resetValidation());
    errorMessages.value = [];
    model.value = null;
  }

  watch(items, () => {
    let valid = null;

    if (items.value.some(item => item.isValid === false)) {
      valid = false;
    } else if (items.value.every(item => item.isValid === true)) {
      valid = true;
    }

    model.value = valid;
  }, {
    deep: true
  });
  provide(FormKey, {
    register: (id, validate, reset, resetValidation, isValid) => {
      if (items.value.some(item => item.id === id)) {
        consoleWarn(`Duplicate input name "${id}"`);
      }

      items.value.push({
        id,
        validate,
        reset,
        resetValidation,
        isValid: isValid // TODO: Better way to type this unwrapping?

      });
    },
    unregister: id => {
      items.value = items.value.filter(item => {
        return item.id !== id;
      });
    },
    isDisabled,
    isReadonly,
    isValidating,
    items
  });
  return {
    errorMessages,
    isDisabled,
    isReadonly,
    isValidating,
    items,
    validate,
    reset,
    resetValidation
  };
}
export function useForm() {
  return inject(FormKey, null);
}
//# sourceMappingURL=form.mjs.map