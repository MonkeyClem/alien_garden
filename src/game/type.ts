import type { PlayerDepthItem } from "../rendering/entities/drawDepthSortedWorld";
import type { Decoration } from "./decorations/decoration.type";
import type { Tile } from "./grid/tiles.types";
import type { Plant } from "./plants/plants.type";

//DECORATIONS ASSETS
export type selectionType = "empty" | "plant" | "decoration" | "player" | null;

export type BioBatteryStatus = "active" | "inactive";

//GAMEPLAY ASSETS
export type Ressources = {
  bioMass: number;
  bioEnergy: number;
  biologicalData: number;
};

//TO MOVE IN RENDERING.TYPE
export type PlantDepthItem = {
  type: "plant";
  depth: number;
  plant: Plant;
  tile: Tile;
};
export type DecorationDepthItem = {
  type: "decoration";
  depth: number;
  decoration: Decoration;
  tile: Tile;
};

export type DepthItem = PlantDepthItem | DecorationDepthItem | PlayerDepthItem;

export type WorldObjectOnTile =
  | {
      type: "plant";
      object: Plant;
    }
  | {
      type: "decoration";
      object: Decoration;
    }
  | {
      type: "player";
      object: Player;
    };

////////PLAYER RELATED TYPES///////
export type PlayerDirections = "left" | "right" | "top" | "bottom";

export interface Player {
  gridX: number;
  gridY: number;
  targetGridX: number;
  targetGridY: number;
  speed: number;

  animationFrame: number;
  animationElapsed: number;
  animationState: "static" | "walking";

  isMoving: boolean;
  direction: PlayerDirections;

  playerPath: Tile[];
}

export interface PathNode {
  tileOnPath: Tile;
  costOfPath: number;
  heuristic: number;
  totalCost: number;
  reachedFromNode: PathNode | null;
}
