import type { GameAssets } from "../../assets/assetTypes";
import { HALF_TILE_HEIGHT } from "../../game/grid/grid.constants";
import type { Tile } from "../../game/grid/tiles.types";
import { getPlantAssetKey } from "../../game/plants/getPlantAssetKey";
import { getPlantStage } from "../../game/plants/getPlantStage";
import type { Plant } from "../../game/plants/plants.type";

export const drawPlant = (
  ctx: CanvasRenderingContext2D,
  plant: Plant,
  tile: Tile,
  assets: GameAssets,
) => {
  const stage = getPlantStage(plant);
  const assetKey = getPlantAssetKey(plant, stage);
  const image = assets[assetKey];

  ctx.drawImage(image, tile.x - 75 / 2, tile.y - HALF_TILE_HEIGHT - 100 / 2, 75, 75);
};
