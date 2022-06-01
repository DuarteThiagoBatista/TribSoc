import { withDirectives as _withDirectives, createVNode as _createVNode, vShow as _vShow } from "vue";
// Composables
import { makeGroupItemProps, useGroupItem } from "../../composables/group.mjs";
import { makeLazyProps, useLazy } from "../../composables/lazy.mjs";
import { MaybeTransition } from "../../composables/transition.mjs"; // Directives

import Touch from "../../directives/touch/index.mjs"; // Utilities

import { computed, inject, nextTick, ref } from 'vue';
import { convertToUnit, defineComponent } from "../../util/index.mjs";
import { VWindowGroupSymbol, VWindowSymbol } from "./VWindow.mjs";
export const VWindowItem = defineComponent({
  name: 'VWindowItem',
  directives: {
    Touch
  },
  props: {
    reverseTransition: {
      type: [Boolean, String],
      default: undefined
    },
    transition: {
      type: [Boolean, String],
      default: undefined
    },
    ...makeLazyProps(),
    ...makeGroupItemProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window = inject(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    if (!window || !groupItem) throw new Error('[Vuetify] VWindowItem must be used inside VWindow');
    const isTransitioning = ref(false);
    const hasTransition = computed(() => window.isReversed.value ? props.reverseTransition !== false : props.transition !== false);

    function onAfterTransition() {
      if (!isTransitioning.value || !window) {
        return;
      } // Finalize transition state.


      isTransitioning.value = false;

      if (window.transitionCount.value > 0) {
        window.transitionCount.value -= 1; // Remove container height if we are out of transition.

        if (window.transitionCount.value === 0) {
          window.transitionHeight.value = undefined;
        }
      }
    }

    function onBeforeTransition() {
      if (isTransitioning.value || !window) {
        return;
      } // Initialize transition state here.


      isTransitioning.value = true;

      if (window.transitionCount.value === 0) {
        var _window$rootRef$value;

        // Set initial height for height transition.
        window.transitionHeight.value = convertToUnit((_window$rootRef$value = window.rootRef.value) == null ? void 0 : _window$rootRef$value.clientHeight);
      }

      window.transitionCount.value += 1;
    }

    function onTransitionCancelled() {
      onAfterTransition(); // This should have the same path as normal transition end.
    }

    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }

      nextTick(() => {
        // Do not set height if no transition or cancelled.
        if (!hasTransition.value || !isTransitioning.value || !window) {
          return;
        } // Set transition target height.


        window.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }

    const transition = computed(() => {
      const name = window.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== 'string' ? window.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    return () => {
      return _createVNode(MaybeTransition, {
        "transition": transition.value
      }, {
        default: () => [_withDirectives(_createVNode("div", {
          "class": ['v-window-item', groupItem.selectedClass.value]
        }, [slots.default && hasContent.value && slots.default()]), [[_vShow, groupItem.isSelected.value]])]
      });
    };
  }

});
//# sourceMappingURL=VWindowItem.mjs.map