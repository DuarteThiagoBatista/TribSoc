var _rgba$inputs;

// Utilities
import { HexToHSVA, HSLAtoHSVA, HSVAtoHex, HSVAtoHSLA, HSVAtoRGBA, parseHex, RGBAtoHSVA } from "../../../util/colorUtils.mjs"; // Types

function has(obj, key) {
  return key.every(k => obj.hasOwnProperty(k));
}

export function parseColor(color) {
  var _hsva$a;

  if (!color) return null;
  let hsva = null;

  if (typeof color === 'string') {
    const hex = parseHex(color);
    hsva = HexToHSVA(hex);
  }

  if (typeof color === 'object') {
    if (has(color, ['r', 'g', 'b'])) {
      hsva = RGBAtoHSVA(color);
    } else if (has(color, ['h', 's', 'l'])) {
      hsva = HSLAtoHSVA(color);
    } else if (has(color, ['h', 's', 'v'])) {
      hsva = color;
    }
  }

  return hsva != null ? { ...hsva,
    a: (_hsva$a = hsva.a) != null ? _hsva$a : 1
  } : null;
}

function stripAlpha(color, stripAlpha) {
  if (stripAlpha) {
    const {
      a,
      ...rest
    } = color;
    return rest;
  }

  return color;
}

export function extractColor(color, input) {
  if (input == null || typeof input === 'string') {
    const hex = HSVAtoHex(color);
    if (color.a === 1) return hex.slice(0, 7);else return hex;
  }

  if (typeof input === 'object') {
    let converted;
    if (has(input, ['r', 'g', 'b'])) converted = HSVAtoRGBA(color);else if (has(input, ['h', 's', 'l'])) converted = HSVAtoHSLA(color);else if (has(input, ['h', 's', 'v'])) converted = color;
    return stripAlpha(converted, !has(input, ['a']));
  }

  return color;
}
export function hasAlpha(color) {
  if (!color) return false;

  if (typeof color === 'string') {
    return color.length > 7;
  }

  if (typeof color === 'object') {
    return has(color, ['a']) || has(color, ['alpha']);
  }

  return false;
}
export const nullColor = {
  h: 0,
  s: 0,
  v: 1,
  a: 1
};
const rgba = {
  inputProps: {
    type: 'number',
    min: 0
  },
  inputs: [{
    label: 'R',
    max: 255,
    step: 1,
    getValue: c => Math.round(c.r),
    getColor: (c, v) => ({ ...c,
      r: Number(v)
    })
  }, {
    label: 'G',
    max: 255,
    step: 1,
    getValue: c => Math.round(c.g),
    getColor: (c, v) => ({ ...c,
      g: Number(v)
    })
  }, {
    label: 'B',
    max: 255,
    step: 1,
    getValue: c => Math.round(c.b),
    getColor: (c, v) => ({ ...c,
      b: Number(v)
    })
  }, {
    label: 'A',
    max: 1,
    step: 0.01,
    getValue: c => Math.round(c.a * 100) / 100,
    getColor: (c, v) => ({ ...c,
      a: Number(v)
    })
  }],
  to: HSVAtoRGBA,
  from: RGBAtoHSVA
};
const rgb = { ...rgba,
  inputs: (_rgba$inputs = rgba.inputs) == null ? void 0 : _rgba$inputs.slice(0, 3)
};
const hsla = {
  inputProps: {
    type: 'number',
    min: 0
  },
  inputs: [{
    label: 'H',
    max: 360,
    step: 1,
    getValue: c => Math.round(c.h),
    getColor: (c, v) => ({ ...c,
      h: Number(v)
    })
  }, {
    label: 'S',
    max: 1,
    step: 0.01,
    getValue: c => Math.round(c.s * 100) / 100,
    getColor: (c, v) => ({ ...c,
      s: Number(v)
    })
  }, {
    label: 'L',
    max: 1,
    step: 0.01,
    getValue: c => Math.round(c.l * 100) / 100,
    getColor: (c, v) => ({ ...c,
      l: Number(v)
    })
  }, {
    label: 'A',
    max: 1,
    step: 0.01,
    getValue: c => Math.round(c.a * 100) / 100,
    getColor: (c, v) => ({ ...c,
      a: Number(v)
    })
  }],
  to: HSVAtoHSLA,
  from: HSLAtoHSVA
};
const hsl = { ...hsla,
  inputs: hsla.inputs.slice(0, 3)
};
const hexa = {
  inputProps: {
    type: 'text'
  },
  inputs: [{
    label: 'HEXA',
    getValue: c => c,
    getColor: (c, v) => v
  }],
  to: HSVAtoHex,
  from: HexToHSVA
};
const hex = { ...hexa,
  inputs: [{
    label: 'HEX',
    getValue: c => c.slice(0, 7),
    getColor: (c, v) => v
  }]
};
export const modes = {
  rgb,
  rgba,
  hsl,
  hsla,
  hex,
  hexa
};
//# sourceMappingURL=index.mjs.map