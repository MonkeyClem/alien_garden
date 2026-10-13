import type React from "react";
import type { Plant } from "../../../../game/plants/plants.type";
import type { SetStateAction } from "react";
import type { selectionType } from "../../../../game/type";

export default interface PlantHudProps {
  plantOnTile: Plant | null | undefined;
  isHarvestButtonActive: boolean;
  setSelectionType: React.Dispatch<SetStateAction<selectionType>>;
  handleRessourcesUpdate: (plantOnTile: Plant) => void;
}
