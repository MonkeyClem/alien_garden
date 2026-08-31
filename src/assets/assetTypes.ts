export type DecorationAssetsKey =
  | "bioTerminal"
  | "bioPalmtree"
  | "trapStore"
  | "bioBattery"
  | "inventoryIcon"
  | "alienGround"
  | "alienGroundTwo"
  | "alienGroundThree"
  | "spacePod";

export type PlantAssetsKey =
  | "reactorMushroomStageOne"
  | "reactorMushroomStageTwo"
  | "reactorMushroomStageThree"
  | "synapticVineStageOne"
  | "synapticVineStageTwo";

export type OverlayAssets = "veins" | "spores" | "smallRock";

export type BackgroundAssets = "mapBackground" | "midground" | "foreground"

export type AssetsKey = DecorationAssetsKey | PlantAssetsKey | OverlayAssets | BackgroundAssets;
export type GameAssets = Record<AssetsKey, HTMLImageElement >;
