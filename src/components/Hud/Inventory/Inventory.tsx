import type { Inventory, seedsType, Tile } from "../../../game/type";

interface InventoryProps {
  selectedTile: Tile | null;
  selectedSeed: seedsType | null;
  inventory: Inventory;
  handleSeedSelection: (selectedSeed: seedsType) => void;
  handlePlantSeed: (selectedSeed: seedsType, selectedTile: Tile) => void;
}

export default function InventoryComponents({
  inventory,
  handleSeedSelection,
  handlePlantSeed,
  selectedTile,
  selectedSeed,
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
          {Object.entries(inventory.seeds).map(([seed, quantity]) => (
            <button
              key={seed}
              onClick={() => handleSeedSelection(seed as seedsType)}
            >
              {seed} : {quantity}
            </button>
          ))}

          {selectedSeed ? (
                <div>
                <p> Graine Sélectionnée : {selectedSeed} </p>
            <button
              disabled={selectedTile.hasSeed ||  inventory.seeds[selectedSeed] === 0}
              onClick={() => handlePlantSeed(selectedSeed, selectedTile)}
            >
              Planter une graine
            </button>
             </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
