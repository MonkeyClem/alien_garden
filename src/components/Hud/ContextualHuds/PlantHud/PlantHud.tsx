import { getPlantStage } from "../../../../game/plants/getPlantStage";
import { SPECIES_CONFIG } from "../../../../game/plants/speciesConfig";
import type PlantHudProps from "./PlantHud.interface";

export default function PlantHud({
  plantOnTile,
  ressources,
  isHarvestButtonActive,
  setSelectionType,
  handleRessourcesUpdate,
}: PlantHudProps) {
  if (!plantOnTile) return;

  const currentStage = getPlantStage(plantOnTile);
  const speciesConfig = SPECIES_CONFIG[plantOnTile.specie];
  const stageConfig = speciesConfig.stages[currentStage];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h3>{speciesConfig.displayName}</h3>
      <p>{speciesConfig.description}</p>

      <p>Rôle : {speciesConfig.role}</p>

      <p>
        Stade {currentStage} — {stageConfig.label}
      </p>

      <p>{stageConfig.description}</p>
      <button
        onClick={() => {
          handleRessourcesUpdate(plantOnTile);
          setSelectionType("empty");
        }}
        // disabled={!isHarvestButtonActive}
        //TO DO : create a function to know the limit of each ressources (which will probably evolve with the player's progression), and use it here
        disabled={ressources.bioEnergy >= 15 || !isHarvestButtonActive}
      >
        Récolter
      </button>
    </div>
  );
}
