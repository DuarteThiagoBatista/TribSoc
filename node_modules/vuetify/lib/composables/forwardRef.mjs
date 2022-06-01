export function useForwardRef(target) {
  for (var _len = arguments.length, refs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    refs[_key - 1] = arguments[_key];
  }

  return new Proxy(target, {
    get(target, key) {
      if (Reflect.has(target, key)) {
        return Reflect.get(target, key);
      }

      for (const ref of refs) {
        if (ref.value && Reflect.has(ref.value, key)) {
          const val = Reflect.get(ref.value, key);
          return typeof val === 'function' ? val.bind(ref.value) : val;
        }
      }
    },

    getOwnPropertyDescriptor(target, key) {
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
      if (descriptor) return descriptor; // Check each ref's own properties

      for (const ref of refs) {
        if (!ref.value) continue;
        const descriptor = Reflect.getOwnPropertyDescriptor(ref.value, key);
        if (descriptor) return descriptor;
      } // Recursive search up each ref's prototype


      for (const ref of refs) {
        let obj = ref.value && Object.getPrototypeOf(ref.value);

        while (obj) {
          const descriptor = Reflect.getOwnPropertyDescriptor(obj, key);
          if (descriptor) return descriptor;
          obj = Object.getPrototypeOf(obj);
        }
      }

      return undefined;
    }

  });
}
//# sourceMappingURL=forwardRef.mjs.map