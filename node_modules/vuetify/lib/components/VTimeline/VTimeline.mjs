import { createVNode as _createVNode } from "vue";
// Styles
import "./VTimeline.css"; // Composables

import { makeTagProps } from "../../composables/tag.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeThemeProps, provideTheme } from "../../composables/theme.mjs"; // Helpers

import { computed, provide, toRef } from 'vue';
import { convertToUnit, defineComponent } from "../../util/index.mjs";
import { VTimelineSymbol } from "./shared.mjs"; // Types

export const VTimeline = defineComponent({
  name: 'VTimeline',
  props: {
    align: {
      type: String,
      default: 'center',
      validator: v => ['center', 'start'].includes(v)
    },
    direction: {
      type: String,
      default: 'vertical',
      validator: v => ['vertical', 'horizontal'].includes(v)
    },
    side: {
      type: String,
      validator: v => v == null || ['start', 'end'].includes(v)
    },
    lineInset: {
      type: [String, Number],
      default: 0
    },
    lineThickness: {
      type: [String, Number],
      default: 2
    },
    lineColor: String,
    truncateLine: {
      type: String,
      validator: v => ['start', 'end', 'both'].includes(v)
    },
    ...makeDensityProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    provide(VTimelineSymbol, {
      density: toRef(props, 'density'),
      lineColor: toRef(props, 'lineColor')
    });
    const sideClass = computed(() => {
      const side = props.side ? props.side : props.density !== 'default' ? 'end' : null;
      return side && `v-timeline--side-${side}`;
    });
    const truncateClasses = computed(() => {
      const classes = ['v-timeline--truncate-line-start', 'v-timeline--truncate-line-end'];

      switch (props.truncateLine) {
        case 'both':
          return classes;

        case 'start':
          return classes[0];

        case 'end':
          return classes[1];

        default:
          return null;
      }
    });
    return () => {
      var _slots$default;

      return _createVNode(props.tag, {
        "class": ['v-timeline', `v-timeline--${props.direction}`, `v-timeline--align-${props.align}`, !props.lineInset && truncateClasses.value, {
          'v-timeline--inset-line': !!props.lineInset
        }, themeClasses.value, densityClasses.value, sideClass.value],
        "style": {
          '--v-timeline-line-thickness': convertToUnit(props.lineThickness),
          '--v-timeline-line-inset': convertToUnit(props.lineInset)
        }
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      });
    };
  }

});
//# sourceMappingURL=VTimeline.mjs.map