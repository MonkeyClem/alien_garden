import type { Ressources } from "../type";

 export const canAffordBuilding = (
    ressources: Ressources,
    buildingCost: Partial<Ressources>,
  ): boolean => {
    return (
      ressources.bioMass >= (buildingCost.bioMass ?? 0) &&
      ressources.biologicalData >= (buildingCost.biologicalData ?? 0) &&
      ressources.bioEnergy >= (buildingCost.bioEnergy ?? 0)
    );
  };