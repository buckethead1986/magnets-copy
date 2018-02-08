export default function snapToGrid(x, y) {
  const snappedX = Math.round(x / 10) * 10;
  const snappedY = Math.round(y / 50) * 50;

  return [snappedX, snappedY];
}
