import type { Dispatch } from "react";
import type { GameAssets } from "../../../assets/assetTypes";
import type { Plant, Species } from "../../../game/plants/plants.type";
import type { Inventory } from "../../../game/inventory/inventory.type";

export default interface InventoryProps {
  plants: Plant[];
  assets: GameAssets;
  inventory: Inventory;
  isInventoryOpen: boolean;
  unlockedSpecies: Species[];
  selectedSpecie: Species | null;
  setIsInventoryOpen: Dispatch<React.SetStateAction<boolean>>;
  handleSeedSelection: (selectedSpecie: Species) => void;
}
