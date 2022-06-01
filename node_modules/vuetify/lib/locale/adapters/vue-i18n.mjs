import { computed, watch } from 'vue'; // Types

function wrapScope(scope) {
  return {
    current: scope.locale,
    fallback: computed(() => {
      // TODO: Handle this better?
      return typeof scope.fallbackLocale.value !== 'string' ? 'en' : scope.fallbackLocale.value;
    }),
    // TODO: Can this be fixed?
    messages: scope.messages,
    t: scope.t,
    n: scope.n
  };
}

export function createVueI18nAdapter(_ref) {
  let {
    i18n,
    useI18n,
    ...rest
  } = _ref;
  return {
    createRoot: () => {
      return wrapScope(i18n.global);
    },
    getScope: () => {
      const scope = useI18n({
        legacy: false,
        useScope: 'parent'
      });
      return wrapScope(scope);
    },
    createScope: function () {
      var _props$messages;

      let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const scope = useI18n({
        legacy: false,
        useScope: 'local',
        messages: (_props$messages = props.messages) != null ? _props$messages : i18n.global.messages,
        // TODO: Fix this
        locale: props.locale,
        fallbackLocale: props.fallbackLocale,
        inheritLocale: !props.locale
      });
      watch(() => props.locale, () => {
        if (props.locale) {
          scope.locale.value = props.locale;
        } else {
          scope.inheritLocale = true;
        }
      });
      watch(() => props.fallbackLocale, () => {
        if (props.fallbackLocale) {
          scope.fallbackLocale.value = props.fallbackLocale;
        }
      });
      return wrapScope(scope);
    },
    ...rest
  };
}
//# sourceMappingURL=vue-i18n.mjs.map