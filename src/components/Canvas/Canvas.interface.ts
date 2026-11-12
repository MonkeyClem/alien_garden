import type { SetStateAction } from "react";
import type { GameAssets } from "../../assets/assetTypes";
import type { Tile } from "../../game/grid/tiles.types";
import type { Species, Plant } from "../../game/plants/plants.type";
import type { Player, selectionType } from "../../game/type";
import type { Viewport } from "../../rendering/viewport/viewport.type";
import type React from "react";
import type { BioBatteryAnimationSequence } from "../../App";

export interface CanvasProps {
  handleTileSelection: (tile: Tile) => void;
  setTiles: (value: Tile[] | ((prev: Tile[]) => Tile[])) => void;
  setSelectionType: React.Dispatch<SetStateAction<selectionType>>;
  setIsSelectedTileOccupied: (value: boolean) => void;
  handlePlantSpecie: (selectedSpecies: Species, selectedTile: Tile) => void;
  handleHUDContainerSize: (viewport: Viewport) => void;
  handleBioBatteryAnalyze: (value: boolean) => void;
  onBioBatteryActivationComplete: () => void;
  tiles: Tile[];
  assets: GameAssets;
  plants: Plant[];
  selectedSpecie: Species | null;
  player: React.RefObject<Player>;
  bioBatteryStatus: "active" | "inactive";
  bioBatteryAnimationSequenceRef: React.RefObject<BioBatteryAnimationSequence>;
}
