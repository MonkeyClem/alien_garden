//DECORATIONS ASSETS
export type selectionType = "empty" | "plant" | "decoration" | null
export type FootPrint = {width : number, height : number}

export type Tile = {
  id: number;
  x: number;
  y: number;
  gridX : number,
  gridY : number,
  selected: boolean;
  hovered: boolean;
  path: Path2D;
};


export type Decoration = {
  id: string
  tileId : number,
  assetKey : DecorationAssetsKey
  gridX: number
  gridY: number
  width: number
  height: number
  offsetX: number
  offsetY: number
  footPrint : FootPrint
}



export const initialDecorations: Decoration[] = [
  {
    id: "bioBattery-1",
    tileId : 2,
    assetKey : "bioBattery",
    gridX: 0,
    gridY: 12,
    width: 350,
    height: 250,
    offsetY: 0,
    offsetX: 0,
    footPrint:{width: 5, height : 5}
  },
    {
    id: "bioPalm-1",
    tileId : 9,
    assetKey : "bioTerminal",
    gridX: 0,
    gridY: 12,
    width: 225,
    height: 200,
    offsetY: -10,
    offsetX: 0,
    footPrint : {width : 2, height : 2}
  }
]

export type DecorationAssetsKey = "bioTerminal" | "bioPalmtree" | "trapStore" | "bioBattery" 
export type PlantAssetsKey =  "reactorMushroomStageOne" | "reactorMushroomStageTwo" | "reactorMushroomStageThree"


export type AssetsKey =  DecorationAssetsKey | PlantAssetsKey
export type GameAssets = Record <AssetsKey, HTMLImageElement>




//GAMEPLAY ASSETS
export type Resources = {
    bioMass : number
  }

export const Species = {
  REACTOR_MUSHROOM :  "reactorMushroom",
  SYNAPTIC_VINE : "synapticVine",
  CRYSTAL_FLOWER : 'crystalFlower'
} as const

export type Species = (typeof Species)[keyof typeof Species]


export type Plant = {
  id: ()=>`${string}-${string}-${string}-${string}-${string}`;
  species: Species;
  tileId: number;
  stage: 1 | 2 | 3;
  plantedAt: number;
  growth: number;
  isReadyToHarvest: boolean;
};

export type Inventory =  { 
  species : Record<Species, number> 
}

