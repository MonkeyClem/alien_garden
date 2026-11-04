import type { GameAssets } from "../../assets/assetTypes";
import type { Decoration } from "../../game/decorations/decoration.type";
import { HALF_TILE_HEIGHT, TILE_HEIGHT } from "../../game/grid/grid.constants";
import type { Tile } from "../../game/grid/tiles.types";
import type { Plant } from "../../game/plants/plants.type";
import type {
  PlantDepthItem,
  DecorationDepthItem,
  DepthItem,
  Player,
} from "../../game/type";
import { GRID_ORIGIN_Y } from "../../game/world/world.constant";
import { drawDecoration } from "./drawDecorations";
import { drawPlant } from "./drawPlants";
import drawPlayer from "./player/drawPlayer";

export type PlayerDepthItem = {
  depth: number;
  player: Player;
  type: "player";
};
export const drawDepthSortedWorld = (
  ctx: CanvasRenderingContext2D,
  time: number,
  plants: Plant[],
  decorations: Decoration[],
  tiles: Tile[],
  assets: GameAssets,
  bioBatteryStatus: "active" | "inactive",
  player: Player,
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

  // const createPlayerDepthItem = (player: Player, tiles: Tile[]): PlayerDepthItem => {
  //   const playerTile = { gridX: player.gridX, gridY: player.gridY };
  //   const foundTile = tiles.find(
  //     tile => tile.gridX === playerTile.gridX && tile.gridY === playerTile.gridY,
  //   );

  //   if (!foundTile)
  //     return {
  //       type: "player",
  //       depth: (player.gridX + player.gridY) * HALF_TILE_HEIGHT + TILE_HEIGHT,
  //       player: player,
  //     };

  //   const playerDepthItem: PlayerDepthItem = {
  //     type: "player",
  //     depth: foundTile.y - TILE_HEIGHT,
  //     //      depth: (player.gridX + player.gridY) * HALF_TILE_HEIGHT + TILE_HEIGHT,
  //     player: player,
  //   };

  //   return playerDepthItem;
  // };

  const createPlayerDepthItem = (player: Player): PlayerDepthItem => {
    return {
      type: "player",
      depth:
        GRID_ORIGIN_Y + (player.gridX + player.gridY) * HALF_TILE_HEIGHT - TILE_HEIGHT,
      player,
    };
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

  const playerDepthItem: PlayerDepthItem = createPlayerDepthItem(player);

  const depthItems: DepthItem[] = [
    ...decorationDepthItems,
    ...plantDepthItems,
    playerDepthItem,
  ];

  const sortedDepthItems = depthItems.sort((a, b) => a.depth - b.depth);

  sortedDepthItems.forEach(item => {
    if (item.type === "decoration") {
      const decorationToDraw =
        item.decoration.assetKey === "bioBattery" && bioBatteryStatus === "active"
          ? { ...item.decoration, assetKey: "bioBatteryOn" as const }
          : item.decoration;
      drawDecoration(ctx, time, decorationToDraw, item.tile, assets);
    }
    if (item.type === "plant") {
      drawPlant(ctx, item.plant, item.tile, assets);
    }
    if (item.type === "player") {
      drawPlayer(ctx, assets, player);
    }
  });
};
