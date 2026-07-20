import type { Tile } from "../../../game/grid/tiles.types";
import type { Species } from "../../../game/plants/plants.type";

interface emptyTileHudProps {
  isInventoryOpen: boolean;
  setIsInventoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSpecie : Species | null,
  isSelectedTileOccupied: boolean,
  selectedTile : Tile
    handlePlantSeed: (selectedSpecie: Species, selectedTile: Tile) => void;
    setIsSelectedTileOccupied: (value: boolean) => void;


}

export default function EmptyTileHud({
  setIsInventoryOpen,
  isInventoryOpen,
  selectedSpecie,
  selectedTile,
isSelectedTileOccupied,
handlePlantSeed,
setIsSelectedTileOccupied
}: emptyTileHudProps) {
  return (
    <div>
      <h3>Tuile Vide</h3>
      <button onClick={() => setIsInventoryOpen(!isInventoryOpen)}>
        {isInventoryOpen ? "Fermer l'inventaire" : "Ouvrir l'inventaire"}
      </button>
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
  );
}
