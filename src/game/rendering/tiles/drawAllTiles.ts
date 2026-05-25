import type { Tile } from "../../type";
import { HALF_TILE_WIDTH, HALF_TILE_HEIGHT } from "./drawScreenGrid";
import { drawTile } from "./drawTile";

  export default function drawAllTiles (
    tilePositions: Tile[],
    ctx: CanvasRenderingContext2D,
  ) {
    return tilePositions.forEach((element) =>
      drawTile(
        ctx,
        element.x,
        element.y,
        HALF_TILE_WIDTH,
        HALF_TILE_HEIGHT,
        element.selected,
      ),
    );
  };

 