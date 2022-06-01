// Utilities
import { getCurrentInstance as _getCurrentInstance } from 'vue';
import { toKebabCase } from "./helpers.mjs";
export function getCurrentInstance(name, message) {
  const vm = _getCurrentInstance();

  if (!vm) {
    throw new Error(`[Vuetify] ${name} ${message || 'must be called from inside a setup function'}`);
  }

  return vm;
}
export function getCurrentInstanceName() {
  var _getCurrentInstance$t;

  let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'composables';
  return toKebabCase((_getCurrentInstance$t = getCurrentInstance(name).type) == null ? void 0 : _getCurrentInstance$t.name);
}
//# sourceMappingURL=getCurrentInstance.mjs.map