import bioBattery from "../assets/PNG/Assets/biobattery.png";
import bioPalmtree from "../assets/PNG/Assets/bioPalmtree.png"


export type seedsType = 'green' | "red" | "blue"

export type Tile = {
  id: number;
  x: number;
  y: number;
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
  offsetY?: number
}


export const initialDecorations: Decoration[] = [
  {
    id: "bio-palm-1",
    tileId : 4,
    asset: bioBattery,
    gridX: 2,
    gridY: 3,
    width: 96,
    height: 96,
    offsetY: -35,
  },
  {
    id: "crystal-1",
    tileId: 1,
    asset: bioPalmtree,
    gridX: 4,
    gridY: 2,
    width: 64,
    height: 80,
    offsetY: -25,
  },
]