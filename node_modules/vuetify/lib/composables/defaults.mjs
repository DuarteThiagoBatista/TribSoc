// Utilities
import { computed, inject, provide, ref, unref } from 'vue';
import { mergeDeep } from "../util/helpers.mjs"; // Types

export const DefaultsSymbol = Symbol.for('vuetify:defaults');
export function createDefaults(options) {
  return ref(options != null ? options : {});
}
export function useDefaults() {
  const defaults = inject(DefaultsSymbol);
  if (!defaults) throw new Error('[Vuetify] Could not find defaults instance');
  return defaults;
}
export function provideDefaults(defaults, options) {
  const injectedDefaults = useDefaults();
  const providedDefaults = ref(defaults);
  const newDefaults = computed(() => {
    const scoped = unref(options == null ? void 0 : options.scoped);
    const reset = unref(options == null ? void 0 : options.reset);
    const root = unref(options == null ? void 0 : options.root);
    let properties = mergeDeep(providedDefaults.value, {
      prev: injectedDefaults.value
    });
    if (scoped) return properties;

    if (reset || root) {
      const len = Number(reset || Infinity);

      for (let i = 0; i <= len; i++) {
        if (!properties.prev) break;
        properties = properties.prev;
      }

      return properties;
    }

    return mergeDeep(properties.prev, properties);
  });
  provide(DefaultsSymbol, newDefaults);
  return newDefaults;
}
//# sourceMappingURL=defaults.mjs.map