import type { Tile } from "../../../game/grid/tiles.types";
import type { Species } from "../../../game/plants/plants.type";
import type { Inventory,  Ressources } from "../../../game/type";
import InventoryComponents from "../Inventory/Inventory";

interface emptyTileHudProps {
  isInventoryOpen: boolean;
  selectedTile: Tile | null;
  inventory: Inventory;
  selectedSpecie: Species | null;
  isSelectedTileOccupied: boolean;
  ressources: Ressources;
  setIsInventoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlantSeed: (selectedSpecie: Species, selectedTile: Tile) => void;
  handleSpecieSelection: (selectedSpecie: Species) => void;
  setIsSelectedTileOccupied: (value: boolean) => void;
}

export default function EmptyTileHud({
  setIsInventoryOpen,
  isInventoryOpen,
  isSelectedTileOccupied,
  selectedSpecie,
  selectedTile,
  handlePlantSeed,
  inventory,
  handleSpecieSelection,
  setIsSelectedTileOccupied,
  ressources,
}: emptyTileHudProps) {
  return (
    <div>
      <h3>Tuile Vide</h3>
      <button onClick={() => setIsInventoryOpen(!isInventoryOpen)}>
        {isInventoryOpen ? "Fermer l'inventaire" : "Ouvrir l'inventaire"}
      </button>
      {isInventoryOpen ? (
        <InventoryComponents
          isInventoryOpen={isInventoryOpen}
          isSelectedTileOccupied={isSelectedTileOccupied}
          selectedSpecie={selectedSpecie}
          selectedTile={selectedTile}
          handlePlantSeed={handlePlantSeed}
          inventory={inventory}
          handleSeedSelection={handleSpecieSelection}
          setIsSelectedTileOccupied={setIsSelectedTileOccupied}
          ressources={ressources}
        />
      ) : null}
    </div>
  );
}
