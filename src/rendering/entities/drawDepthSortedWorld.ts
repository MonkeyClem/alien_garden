import type { GameAssets } from "../../assets/assetTypes";

import type { Decoration } from "../../game/decorations/decoration.type";
import type { Tile } from "../../game/grid/tiles.types";
import type { Plant } from "../../game/plants/plants.type";
import type { PlantDepthItem, DecorationDepthItem, DepthItem } from "../../game/type";
import { drawDecoration } from "./drawDecorations";
import { drawPlant } from "./drawPlants";

export const drawDepthSortedWorld = (
  ctx: CanvasRenderingContext2D,
  plants: Plant[],
  decorations: Decoration[],
  tiles: Tile[],
  assets: GameAssets,
) => {
  const createPlantDepthItem = (plant: Plant, tiles: Tile[]) => {
    const foundTile = tiles.find(tile => tile.id === plant.tileId);

    if (!foundTile) return;

    const plantDepthItem: PlantDepthItem = {
      type: "plant",
      depth: foundTile.y,
      plant: plant,
      tile: foundTile,
    };

    return plantDepthItem;
  };

  const createDecorationDepthItem = (
    decoration: Decoration,
    tiles: Tile[],
  ): DecorationDepthItem | undefined => {
    const foundTile = tiles.find(tile => tile.id === decoration.tileId);

    if (!foundTile) return;

    const decorationDepthItem: DecorationDepthItem = {
      type: "decoration",
      depth: foundTile.y,
      decoration: decoration,
      tile: foundTile,
    };

    return decorationDepthItem;
  };

  const plantDepthItems: PlantDepthItem[] = [];

  plants.forEach(plant => {
    const result = createPlantDepthItem(plant, tiles);

    if (result === undefined) return;

    plantDepthItems.push(result);
  });

  const decorationDepthItems: DecorationDepthItem[] = [];

  decorations.forEach(decoration => {
    const result = createDecorationDepthItem(decoration, tiles);

    if (result === undefined) return;

    decorationDepthItems.push(result);
  });

  const depthItems: DepthItem[] = [...decorationDepthItems, ...plantDepthItems];

  const sortedDepthItems = depthItems.sort((a, b) => a.depth - b.depth);

  sortedDepthItems.forEach(item => {
    if (item.type === "decoration") {
      drawDecoration(ctx, item.decoration, item.tile, assets);
    }
    if (item.type === "plant") {
      drawPlant(ctx, item.plant, item.tile, assets);
    }
  });
};
