export function bias(val) {
  const c = 0.501;
  const x = Math.abs(val);
  return Math.sign(val) * (x / ((1 / c - 2) * (1 - x) + 1));
}
export function calculateUpdatedOffset(_ref) {
  let {
    selectedElement,
    containerSize,
    contentSize,
    isRtl,
    currentScrollOffset,
    isHorizontal
  } = _ref;
  const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
  const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;
  const adjustedOffsetStart = isRtl ? contentSize - offsetStart - clientSize : offsetStart;

  if (isRtl) {
    currentScrollOffset = -currentScrollOffset;
  }

  const totalSize = containerSize + currentScrollOffset;
  const itemOffset = clientSize + adjustedOffsetStart;
  const additionalOffset = clientSize * 0.4;

  if (adjustedOffsetStart <= currentScrollOffset) {
    currentScrollOffset = Math.max(adjustedOffsetStart - additionalOffset, 0);
  } else if (totalSize <= itemOffset) {
    currentScrollOffset = Math.min(currentScrollOffset - (totalSize - itemOffset - additionalOffset), contentSize - containerSize);
  }

  return isRtl ? -currentScrollOffset : currentScrollOffset;
}
export function calculateCenteredOffset(_ref2) {
  let {
    selectedElement,
    containerSize,
    contentSize,
    isRtl,
    isHorizontal
  } = _ref2;
  const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
  const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;

  if (isRtl) {
    const offsetCentered = contentSize - offsetStart - clientSize / 2 - containerSize / 2;
    return -Math.min(contentSize - containerSize, Math.max(0, offsetCentered));
  } else {
    const offsetCentered = offsetStart + clientSize / 2 - containerSize / 2;
    return Math.min(contentSize - containerSize, Math.max(0, offsetCentered));
  }
}
//# sourceMappingURL=helpers.mjs.map