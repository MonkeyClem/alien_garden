import type { SetStateAction } from "react";
import type { GameAssets } from "../../assets/assetTypes";
import type { Tile } from "../../game/grid/tiles.types";
import type { Species, Plant } from "../../game/plants/plants.type";
import type { selectionType } from "../../game/type";
import type { Viewport } from "../../rendering/viewport/viewport.type";

export interface CanvasProps {
  handleTileSelection: (tile: Tile) => void;
  setTiles: (value: Tile[] | ((prev: Tile[]) => Tile[])) => void;
  setSelectionType: React.Dispatch<SetStateAction<selectionType>>;
  setIsSelectedTileOccupied: (value: boolean) => void;
  handlePlantSpecie: (selectedSpecies: Species, selectedTile: Tile) => void;
  handleHUDContainerSize: (viewport: Viewport) => void;
  handleBioBatteryAnalyze: (value : boolean) => void;
  tiles: Tile[];
  assets: GameAssets;
  plants: Plant[];
  selectedSpecie: Species | null;
  bioBatteryStatus: "active" | "inactive";
}
