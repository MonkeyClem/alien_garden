import type { Decoration } from "./decorations/decoration.type";
import type { Tile } from "./grid/tiles.types";
import type { Plant, Species } from "./plants/plants.type";

//DECORATIONS ASSETS
export type selectionType = "empty" | "plant" | "decoration" | null;

//GAMEPLAY ASSETS
export type Ressources = {
  bioMass: number;
  bioEnergy: number;
  biologicalData: number;
};

export type Inventory = {
  species: Record<Species, number>;
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
