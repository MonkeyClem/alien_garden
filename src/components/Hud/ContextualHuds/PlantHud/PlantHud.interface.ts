import type { Plant } from "../../../../game/plants/plants.type";

export default interface PlantHudProps {
  plantOnTile: Plant | null | undefined;
  isHarvestButtonActive: boolean;
  handleRessourcesUpdate: (plantOnTile: Plant) => void;
}
