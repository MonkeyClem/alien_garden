import type { Decoration } from "./decorations/decoration.type";
import type { Tile } from "./grid/tiles.types";
import type { Plant } from "./plants/plants.type";

//DECORATIONS ASSETS
export type selectionType = "empty" | "plant" | "decoration" | null;

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



export type DepthItem = PlantDepthItem | DecorationDepthItem;

export type WorldObjectOnTile =
  | {
      type: "plant";
      object: Plant;
    }
  | {
      type: "decoration";
      object: Decoration;
    };
