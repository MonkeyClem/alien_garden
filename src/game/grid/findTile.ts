import type { Tile } from "./tiles.types";

export default function findTile(
  tilePositions: Tile[],
  clickedPos: { x: number; y: number },
  ctx: CanvasRenderingContext2D,
) {
  const xPosToFind = clickedPos.x;
  const yPosToFind = clickedPos.y;

  let selectedTile: Tile | null = null;

  for(const tile of tilePositions){
   const isSelected: boolean = ctx.isPointInPath(
      tile.path,
      xPosToFind,
      yPosToFind,
    );
   if (isSelected) selectedTile = tile;
  }


  return selectedTile?.id;
}
