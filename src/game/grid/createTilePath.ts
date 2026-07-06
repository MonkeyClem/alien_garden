export function createTilePath(
  centerX: number,
  centerY: number,
  halfWidth: number,
  halfHeight: number,
) {
  const path = new Path2D();

  path.moveTo(centerX, centerY - halfHeight);
  path.lineTo(centerX + halfWidth, centerY);
  path.lineTo(centerX, centerY + halfHeight);
  path.lineTo(centerX - halfWidth, centerY);

  path.closePath();

  console.log("path : ", path);

  return path;
}
