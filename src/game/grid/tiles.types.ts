export type GroundVariant = 0 | 1 | 2

export type GroundOverlay = "smallRock"
  | "spores"
  | "vein"
  | null;

export type Tile = {
  id: number;
  x: number;
  y: number;
  gridX : number,
  gridY : number,
  selected: boolean;
  hovered: boolean;
  path: Path2D;

  groundVariant: GroundVariant;
  groundOverlay?: GroundOverlay
};