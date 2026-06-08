import bioBattery from "/assets/PNG/Assets/biobattery.png";
import bioPalmtree from "/assets/PNG/Assets/bioPalmtree.png"


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
  asset: string
  gridX: number
  gridY: number
  width: number
  height: number
  offsetX?: number
  offsetY: number
}


export const initialDecorations: Decoration[] = [
  {
    id: "bio-palm-1",
    tileId : 2,
    asset: bioBattery,
    gridX: 0,
    gridY: 2,
    width: 0,
    height: 0,
    offsetY: 0,
  },
    {
    id: "bio-palm-1",
    tileId : 2,
    asset: bioPalmtree,
    gridX: 0,
    gridY: 4,
    width: 0,
    height: 0,
    offsetY: 0,
  },
    {
    id: "bio-palm-1",
    tileId : 2,
    asset: bioPalmtree,
    gridX: 0,
    gridY: 6,
    width: 0,
    height: 0,
    offsetY: 0,
  },
  {
    id: "crystal-1",
    tileId: 1,
    asset: bioPalmtree,
    gridX: 0,
    gridY: 0,
    width: 0,
    height: 0,
    offsetY: 0,
  },
]


export type AssetsKey =  "bioPalmtree" 

export type GameAssets = Record <AssetsKey, HTMLImageElement>
