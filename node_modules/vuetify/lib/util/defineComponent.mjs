// Utils
import { defineComponent as _defineComponent, effectScope, getCurrentInstance, shallowReactive, shallowRef, toRaw, watch, watchEffect } from 'vue';
import { consoleWarn } from "./console.mjs";
import { toKebabCase } from "./helpers.mjs";
import { provideDefaults, useDefaults } from "../composables/defaults.mjs"; // Types

function propIsDefined(vnode, prop) {
  var _vnode$props, _vnode$props2;

  return ((_vnode$props = vnode.props) == null ? void 0 : _vnode$props.hasOwnProperty(prop)) || ((_vnode$props2 = vnode.props) == null ? void 0 : _vnode$props2.hasOwnProperty(toKebabCase(prop)));
}

export const defineComponent = function defineComponent(options) {
  var _options$_setup;

  options._setup = (_options$_setup = options._setup) != null ? _options$_setup : options.setup;

  if (!options.name) {
    consoleWarn('The component is missing an explicit name, unable to generate default prop value');
    return options;
  }

  if (options._setup) {
    var _options$props;

    options.props = (_options$props = options.props) != null ? _options$props : {};
    options.props._as = String;

    options.setup = function setup(props, ctx) {
      const vm = getCurrentInstance();
      const defaults = useDefaults();

      const _subcomponentDefaults = shallowRef();

      const _props = shallowReactive({ ...toRaw(props)
      });

      watchEffect(() => {
        var _props$_as;

        const globalDefaults = defaults.value.global;
        const componentDefaults = defaults.value[(_props$_as = props._as) != null ? _props$_as : options.name];

        if (componentDefaults) {
          const subComponents = Object.entries(componentDefaults).filter(_ref => {
            let [key] = _ref;
            return key.startsWith('V');
          });
          if (subComponents.length) _subcomponentDefaults.value = Object.fromEntries(subComponents);
        }

        for (const prop of Object.keys(props)) {
          let newVal;

          if (propIsDefined(vm.vnode, prop)) {
            newVal = props[prop];
          } else {
            var _ref2, _componentDefaults$pr;

            newVal = (_ref2 = (_componentDefaults$pr = componentDefaults == null ? void 0 : componentDefaults[prop]) != null ? _componentDefaults$pr : globalDefaults == null ? void 0 : globalDefaults[prop]) != null ? _ref2 : props[prop];
          }

          if (_props[prop] !== newVal) {
            _props[prop] = newVal;
          }
        }
      });

      const setupBindings = options._setup(_props, ctx);

      let scope;
      watch(_subcomponentDefaults, (val, oldVal) => {
        if (!val && scope) scope.stop();else if (val && !oldVal) {
          scope = effectScope();
          scope.run(() => {
            provideDefaults(val);
          });
        }
      }, {
        immediate: true
      });
      return setupBindings;
    };
  }

  return options;
};
export function genericComponent() {
  let exposeDefaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return options => (exposeDefaults ? defineComponent : _defineComponent)(options);
}
//# sourceMappingURL=defineComponent.mjs.map