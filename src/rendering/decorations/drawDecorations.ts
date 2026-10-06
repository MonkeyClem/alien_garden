import type { GameAssets } from "../../assets/assetTypes";
import type { Decoration } from "../../game/decorations/decoration.type";
import { HALF_TILE_HEIGHT } from "../../game/grid/grid.constants";
import type { Tile } from "../../game/grid/tiles.types";

export const drawDecoration = (
  ctx: CanvasRenderingContext2D,
  decoration : Decoration,
  tile: Tile,
  assets: GameAssets,
) => {

    const image = assets[decoration.assetKey];

    const x = tile.x - decoration.width / 2 + decoration.offsetX;

    const y =
      tile.y - decoration.height / 2 + HALF_TILE_HEIGHT + decoration.offsetY;

    ctx.drawImage(image, x, y, decoration.width, decoration.height);
  
};
