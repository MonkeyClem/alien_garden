export type Tile = {
  id: number;
  x: number;
  y: number;
  selected: boolean;
  hovered: boolean;
  hasSeed: boolean;
  path: Path2D;
};


export type Plant = {
    id:number,
    tileId : number,
    growth : number,
    stage: "seed" | "sprout" | "mature";
}