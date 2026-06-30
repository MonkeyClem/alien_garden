import type { Tile } from "../../type";

export default function findTile(
  tilePositions: Tile[],
  clickedPos: { x: number; y: number },
  ctx: CanvasRenderingContext2D,
) {
  const xPosToFind = clickedPos.x;
  const yPosToFind = clickedPos.y;

  let selectedTile: Tile | null = null;

  tilePositions.forEach((tile) => {
    const isSelected: boolean = ctx.isPointInPath(
      tile.path,
      xPosToFind,
      yPosToFind,
    );
    if (isSelected) selectedTile = tile;
  });

  return selectedTile?.id;
}
