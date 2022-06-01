import { createVNode as _createVNode } from "vue";
// Styles
import "./VColorPickerCanvas.css"; // Utilities

import { computed, onMounted, ref, watch } from 'vue';
import { clamp, convertToUnit, defineComponent, getEventCoordinates } from "../../util/index.mjs"; // Types

export const VColorPickerCanvas = defineComponent({
  name: 'VColorPickerCanvas',
  props: {
    color: {
      type: Object
    },
    disabled: Boolean,
    dotSize: {
      type: [Number, String],
      default: 10
    },
    height: {
      type: [Number, String],
      default: 150
    },
    width: {
      type: [Number, String],
      default: 300
    }
  },
  emits: {
    'update:color': color => true,
    'update:position': hue => true
  },

  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const isInteracting = ref(false);
    const isOutsideUpdate = ref(false);
    const dotPosition = ref({
      x: 0,
      y: 0
    });
    const dotStyles = computed(() => {
      const {
        x,
        y
      } = dotPosition.value;
      const radius = parseInt(props.dotSize, 10) / 2;
      return {
        width: convertToUnit(props.dotSize),
        height: convertToUnit(props.dotSize),
        transform: `translate(${convertToUnit(x - radius)}, ${convertToUnit(y - radius)})`
      };
    });
    const canvasRef = ref();

    function updateDotPosition(x, y, rect) {
      const {
        left,
        top,
        width,
        height
      } = rect;
      dotPosition.value = {
        x: clamp(x - left, 0, width),
        y: clamp(y - top, 0, height)
      };
    }

    function handleClick(e) {
      if (props.disabled || !canvasRef.value) return;
      updateDotPosition(e.clientX, e.clientY, canvasRef.value.getBoundingClientRect());
    }

    function handleMouseDown(e) {
      // To prevent selection while moving cursor
      e.preventDefault();
      if (props.disabled) return;
      isInteracting.value = true;
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    function handleMouseMove(e) {
      if (props.disabled || !canvasRef.value) return;
      isInteracting.value = true;
      const coords = getEventCoordinates(e);
      updateDotPosition(coords.clientX, coords.clientY, canvasRef.value.getBoundingClientRect());
    }

    function handleMouseUp() {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    }

    watch(dotPosition, () => {
      var _props$color$h, _props$color, _props$color$a, _props$color2;

      if (isOutsideUpdate.value) {
        isOutsideUpdate.value = false;
        return;
      }

      if (!canvasRef.value) return;
      const {
        width,
        height
      } = canvasRef.value.getBoundingClientRect();
      const {
        x,
        y
      } = dotPosition.value;
      emit('update:color', {
        h: (_props$color$h = (_props$color = props.color) == null ? void 0 : _props$color.h) != null ? _props$color$h : 0,
        s: clamp(x, 0, width) / width,
        v: 1 - clamp(y, 0, height) / height,
        a: (_props$color$a = (_props$color2 = props.color) == null ? void 0 : _props$color2.a) != null ? _props$color$a : 1
      });
    });

    function updateCanvas() {
      var _props$color$h2, _props$color3;

      if (!canvasRef.value) return;
      const canvas = canvasRef.value;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      saturationGradient.addColorStop(0, 'hsla(0, 0%, 100%, 1)'); // white

      saturationGradient.addColorStop(1, `hsla(${(_props$color$h2 = (_props$color3 = props.color) == null ? void 0 : _props$color3.h) != null ? _props$color$h2 : 0}, 100%, 50%, 1)`);
      ctx.fillStyle = saturationGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      valueGradient.addColorStop(0, 'hsla(0, 0%, 100%, 0)'); // transparent

      valueGradient.addColorStop(1, 'hsla(0, 0%, 0%, 1)'); // black

      ctx.fillStyle = valueGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    watch(() => {
      var _props$color4;

      return (_props$color4 = props.color) == null ? void 0 : _props$color4.h;
    }, updateCanvas, {
      immediate: true
    });
    watch(() => props.color, () => {
      if (isInteracting.value) {
        isInteracting.value = false;
        return;
      }

      if (!props.color) return;
      isOutsideUpdate.value = true;
      dotPosition.value = {
        x: props.color.s * parseInt(props.width, 10),
        y: (1 - props.color.v) * parseInt(props.height, 10)
      };
    }, {
      deep: true,
      immediate: true
    });
    onMounted(() => updateCanvas());
    return () => _createVNode("div", {
      "class": "v-color-picker-canvas",
      "style": {
        width: convertToUnit(props.width),
        height: convertToUnit(props.height)
      },
      "onClick": handleClick,
      "onMousedown": handleMouseDown,
      "onTouchstart": handleMouseDown
    }, [_createVNode("canvas", {
      "ref": canvasRef,
      "width": props.width,
      "height": props.height
    }, null), _createVNode("div", {
      "class": ['v-color-picker-canvas__dot', {
        'v-color-picker-canvas__dot--disabled': props.disabled
      }],
      "style": dotStyles.value
    }, null)]);
  }

});
//# sourceMappingURL=VColorPickerCanvas.mjs.map