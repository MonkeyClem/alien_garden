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

export type IconsAssetKey = "bioMass" | "bioEnergy" | "biologicalData" | "open_mission_button" | "close_mission_button"

export type BackgroundAssets = "mapBackground" | "midground" | "midgroundTwo" | "midgroundThree" |"midgroundFour"| "midgroundFillerOne" |"foreground"

export type AssetsKey = DecorationAssetsKey | PlantAssetsKey | OverlayAssets | BackgroundAssets | IconsAssetKey;
export type GameAssets = Record<AssetsKey, HTMLImageElement >;
