
export type DecorationAssetsKey = "bioTerminal" | "bioPalmtree" | "trapStore" | "bioBattery" 
export type PlantAssetsKey =  "reactorMushroomStageOne" | "reactorMushroomStageTwo" | "reactorMushroomStageThree"

export type AssetsKey =  DecorationAssetsKey | PlantAssetsKey
export type GameAssets = Record <AssetsKey, HTMLImageElement>