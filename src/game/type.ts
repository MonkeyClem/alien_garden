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