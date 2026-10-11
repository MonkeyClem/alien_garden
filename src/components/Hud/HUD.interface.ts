import type { GameAssets } from "../../assets/assetTypes";
import type { Tile } from "../../game/grid/tiles.types";
import type { Species, Plant } from "../../game/plants/plants.type";
import type { Inventory, selectionType, Ressources } from "../../game/type";
import type { Viewport } from "../../rendering/viewport/viewport.type";

export default interface HUDProps {
  selectedTile: Tile | null;
  inventory: Inventory;
  assets: GameAssets;
  selectedSpecie: Species | null;
  selectionType: selectionType;
  isSelectedTileOccupied: boolean;
  plants: Plant[];
  ressources: Ressources;
  isHarvestButtonActive: boolean;
  unlockedSpecies: Species[];
  HUDContainerSize: Viewport | null;
  handlePlantSeed: (selectedSpecie: Species, selectedTile: Tile) => void;
  handleSpecieSelection: (selectedSpecie: Species) => void;
  handleRessourcesUpdate: (plantOnTile: Plant) => void;
  setIsHarvestButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelectedTileOccupied: (value: boolean) => void;
  setRessources: React.Dispatch<React.SetStateAction<Ressources>>;
  setUnlockedSpecies: React.Dispatch<React.SetStateAction<Species[]>>;
}
