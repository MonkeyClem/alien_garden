import { getPlantStage } from "../../../game/plants/getPlantStage";
import type { Plant } from "../../../game/plants/plants.type";
import { SPECIES_CONFIG } from "../../../game/plants/speciesConfig";

interface PlantHudProps {
    plantOnTile: Plant | null | undefined,
    isHarvestButtonActive: boolean,
    handleRessourcesUpdate: (plantOnTile: Plant) => void;
}

export default function PlantHud({ 
  plantOnTile,
  isHarvestButtonActive,
  handleRessourcesUpdate,
}: PlantHudProps) {
  if (!plantOnTile) return;

  const currentStage = getPlantStage(plantOnTile);
  const speciesConfig = SPECIES_CONFIG[plantOnTile.species];
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
        onClick={() => handleRessourcesUpdate(plantOnTile)}
        disabled={!isHarvestButtonActive}
      >
        Récolter
      </button>
    </div>
  );
}
