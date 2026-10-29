export type DecorationAssetsKey =
  | "bio_terminal"
  | "bioPalmtree"
  | "trapStore"
  | "bioBattery"
  | "bioBatteryOn"
  | "bioBatteryOnGlow"
  | "inventoryIcon"
  | "alienGround"
  | "alienGroundTwo"
  | "alienGroundThree"
  | "spacePod"
  | "firstMapLake"
  | "green_house"

export type PlantAssetsKey =
  | "reactorMushroomStageOne"
  | "reactorMushroomStageTwo"
  | "reactorMushroomStageThree"
  | "synapticVineStageOne"
  | "synapticVineStageTwo";


export type IconsAssetKey = "bioMass" | "bioEnergy" | "biologicalData" | "open_mission_button" | "close_mission_button"

export type NarrativeImageKey = "transmissionOperator"

export type PlayableCharacterKey = "playable_char_static" | "walking_character"

export type BackgroundAssets = "mapBackground" | "midground" | "midgroundTwo" | "midgroundThree" |"midgroundFour"| "midgroundFillerOne" |"foreground"

export type AssetsKey = DecorationAssetsKey | PlantAssetsKey | BackgroundAssets | IconsAssetKey | NarrativeImageKey | PlayableCharacterKey;

export type GameAssets = Record<AssetsKey, HTMLImageElement >;
