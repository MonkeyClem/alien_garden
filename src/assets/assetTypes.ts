export type DecorationAssetsKey =
  | "bioTerminal"
  | "bioPalmtree"
  | "trapStore"
  | "bioBattery"
  | "inventoryIcon"
  | "alienGround"
  | "alienGroundTwo"
  | "alienGroundThree"
  | "spacePod"
  | "firstMapLake";

export type PlantAssetsKey =
  | "reactorMushroomStageOne"
  | "reactorMushroomStageTwo"
  | "reactorMushroomStageThree"
  | "synapticVineStageOne"
  | "synapticVineStageTwo";

export type OverlayAssets = "veins" | "spores" | "smallRock";

export type BackgroundAssets = "mapBackground" | "midground" | "midgroundTwo" | "midgroundThree" |"midgroundFour"| "midgroundFillerOne" |"foreground"

export type AssetsKey = DecorationAssetsKey | PlantAssetsKey | OverlayAssets | BackgroundAssets;
export type GameAssets = Record<AssetsKey, HTMLImageElement >;
