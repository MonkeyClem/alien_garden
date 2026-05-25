import { halfWidth, halfHeight } from "../../../components/Canvas/Canvas";
import type { Tile } from "../../type";
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
        halfWidth,
        halfHeight,
        element.selected,
      ),
    );
  };

 