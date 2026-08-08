import type { GameAssets } from "../../assets/assetTypes";
import { HALF_TILE_HEIGHT } from "../grid/grid.constants";
import type { Tile } from "../grid/tiles.types";
import type { Building } from "./buildings.type";
import { BUILDING_CONFIG } from "./buildingsConfig";

export const drawBuildings = (
  ctx: CanvasRenderingContext2D,
  buildings: Building[],
  tiles: Tile[],
  assets: GameAssets,
) => {
  buildings.forEach((building) => {
    const tile = tiles.find(
      (currentTile) => currentTile.id === building.tileId,
    );

    if (!tile) return;

    const config = BUILDING_CONFIG[building.type];
    const image = assets[config.assetKey];

      const y =
      tile.y - config.height / 2 + HALF_TILE_HEIGHT + config.offsetY;


          const x = tile.x - config.width / 2 + config.offsetX;


    ctx.drawImage(
      image,
      x,
      y,
      config.width,
      config.height,
    );
  });
};
