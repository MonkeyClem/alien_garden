import type { Inventory, Resources, Species, Tile } from "../../../game/type";

interface InventoryProps {
  selectedTile: Tile | null;
  selectedSpecie: Species | null;
  inventory: Inventory;
  ressources : Resources
  handleSeedSelection: (selectedSpecie: Species) => void;
  handlePlantSeed: (selectedSpecie: Species, selectedTile: Tile) => void;
}

export default function InventoryComponents({
  inventory,
  handleSeedSelection,
  handlePlantSeed,
  selectedTile,
  selectedSpecie,
  ressources
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
          {Object.entries(inventory.species).map(([specie, quantity]) => (
            <button
              key={specie}
              onClick={() => handleSeedSelection(specie as Species)}
            >
              {specie} : {quantity}
            </button>
          ))}

          {selectedSpecie ? (
                <div>
                <p> Graine Sélectionnée : {selectedSpecie} </p>
            <button
              // disabled={selectedTile.hasSeed ||  inventory.seeds[selectedSpecie] === 0}
              onClick={() => handlePlantSeed(selectedSpecie, selectedTile)}
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
