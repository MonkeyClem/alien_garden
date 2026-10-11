import type { Tile } from "../../../../game/grid/tiles.types";
import type { Species } from "../../../../game/plants/plants.type";

export default interface EmptyTileHudProps {
  isInventoryOpen: boolean;
  setIsInventoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSpecie: Species | null;
  isSelectedTileOccupied: boolean;
  selectedTile: Tile;
  handlePlantSeed: (selectedSpecie: Species, selectedTile: Tile) => void;
  setIsSelectedTileOccupied: (value: boolean) => void;
}
