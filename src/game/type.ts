export type seedsType = 'green' | "red" | "blue"

export type Tile = {
  id: number;
  x: number;
  y: number;
  gridX : number,
  gridY : number,
  selected: boolean;
  hovered: boolean;
  hasSeed: boolean;
  decoration? : GameAssets;
  seedsType? : seedsType;
  path: Path2D;
};


export type Plant = {
  id:number,
  tileId : number,
  growth : number,
  stage: "seed" | "sprout" | "mature";
}


export type Inventory =  { 
  seeds : Record<seedsType, number>
}

export type Decoration = {
  id: string
  tileId : number,
  assetKey : AssetsKey
  gridX: number
  gridY: number
  width: number
  height: number
  offsetX: number
  offsetY: number
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
    offsetX: 0
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
    offsetX: 0
  }
]


export type AssetsKey =  "bioPalmtree" | "trapStore" | "bioBattery" | "bioTerminal"
export type GameAssets = Record <AssetsKey, HTMLImageElement>
