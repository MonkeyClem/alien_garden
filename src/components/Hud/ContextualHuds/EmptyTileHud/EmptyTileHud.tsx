import type EmptyTileHudProps from "./EmptyTileHud.interface";

export default function EmptyTileHud({
  selectedSpecie,
  selectedTile,
  isSelectedTileOccupied,
  handlePlantSeed,
  setIsSelectedTileOccupied,
}: EmptyTileHudProps) {
  return (
    <div>
      <h3>Emplacement vide</h3>
      {selectedTile.id}
      "selectedTile.gridX :"{selectedTile.gridX}
      "selectedTile.gridY :"{selectedTile.gridY}
      <p>
        Cette parcelle de terre est fertile ! Vous pouvez y planter n'importe laquelle de
        vos graines{" "}
      </p>
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
