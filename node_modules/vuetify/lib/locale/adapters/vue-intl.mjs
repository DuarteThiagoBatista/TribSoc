import { ref } from 'vue';

function wrapScope(scope) {
  const current = ref(scope.locale);
  const fallback = ref(scope.defaultLocale);
  const messages = ref(scope.messages);
  return {
    current,
    fallback,
    messages: messages,
    t: function (id) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      return scope.formatMessage({
        id
      }, params.reduce((obj, value, index) => ({ ...obj,
        [index]: value
      }), {}));
    },
    n: value => scope.formatNumber(value)
  };
}
/**
 * There is no reactivity in this adapter, because vue-intl package does not seem to support it
 */


export function createVueIntlAdapter(_ref) {
  let {
    createIntl,
    useIntl,
    provideIntl,
    locale,
    defaultLocale,
    messages,
    ...rest
  } = _ref;
  return {
    createRoot: () => {
      return wrapScope(createIntl({
        locale,
        defaultLocale,
        messages: messages[locale]
      }));
    },
    getScope: () => {
      const scope = useIntl();
      return wrapScope(scope);
    },
    createScope: function () {
      var _props$locale, _props$fallbackLocale, _props$locale2;

      let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const newScope = createIntl({
        locale: (_props$locale = props.locale) != null ? _props$locale : locale,
        defaultLocale: (_props$fallbackLocale = props.fallbackLocale) != null ? _props$fallbackLocale : defaultLocale,
        messages: messages[(_props$locale2 = props.locale) != null ? _props$locale2 : locale]
      });
      provideIntl(newScope);
      return wrapScope(newScope);
    },
    ...rest
  };
}
//# sourceMappingURL=vue-intl.mjs.map