import type { Tile } from "../../../game/grid/tiles.types";
import type { Species } from "../../../game/plants/plants.type";
import type { Inventory, Ressources } from "../../../game/type";

interface InventoryProps {
  selectedTile: Tile | null;
  selectedSpecie: Species | null;
  inventory: Inventory;
  ressources: Ressources;
  isSelectedTileOccupied: boolean;
  isInventoryOpen: boolean;
  handleSeedSelection: (selectedSpecie: Species) => void;
  handlePlantSeed: (selectedSpecie: Species, selectedTile: Tile) => void;
  setIsSelectedTileOccupied: (value: boolean) => void;
}

export default function InventoryComponents({
  inventory,
  selectedTile,
  selectedSpecie,
  ressources,
  isSelectedTileOccupied,
  isInventoryOpen,
  handleSeedSelection,
  handlePlantSeed,
  setIsSelectedTileOccupied,
}: InventoryProps) {
  return (
    <div>
      <h3>Inventaire</h3>
      {selectedTile ? (
        <div
          style={{
            backgroundColor: "red",
          }}
        >
          {isInventoryOpen
            ? Object.entries(inventory.species).map(([specie, quantity]) => (
                <button
                  key={specie}
                  onClick={() => handleSeedSelection(specie as Species)}
                >
                  {specie} : {quantity}
                </button>
              ))
            : null}
          {selectedSpecie ? (
            <div>
              <p> Graine Sélectionnée : {selectedSpecie} </p>
              <button
                disabled={isSelectedTileOccupied}
                onClick={() => {
                  handlePlantSeed(selectedSpecie, selectedTile);
                  setIsSelectedTileOccupied(true);
                }}
              >
                Planter une graine
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      <p>Ressources disponibles : {ressources.bioMass}</p>
    </div>
  );
}
