
export type DecorationAssetsKey = "bioTerminal" | "bioPalmtree" | "trapStore" | "bioBattery" | "inventoryIcon" | "alienGround" | "alienGroundTwo" | "alienGroundThree" | "spacePod" 
export type PlantAssetsKey =  "reactorMushroomStageOne" | "reactorMushroomStageTwo" | "reactorMushroomStageThree"
export type OverlayAssets =  "veins" | "spores" | "smallRock" 
  

export type AssetsKey =  DecorationAssetsKey | PlantAssetsKey | OverlayAssets 
export type GameAssets = Record <AssetsKey, HTMLImageElement>