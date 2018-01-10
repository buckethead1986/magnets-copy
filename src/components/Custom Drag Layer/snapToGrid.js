export default function snapToGrid(x, y) {
  const snappedX = Math.round(x / 38) * 38;
  const snappedY = Math.round(y / 38) * 38;

  return [snappedX, snappedY];
}
