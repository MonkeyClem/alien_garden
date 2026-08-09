import type { Ressources } from "../type";

export const substractBuildingCost = (
    resources: Ressources,
    cost: Partial<Ressources>,
  ): Ressources => ({
    biomass: resources.biomass - (cost.biomass ?? 0),
    bioEnergy: resources.bioEnergy - (cost.bioEnergy ?? 0),
    biologicalData: resources.biologicalData - (cost.biologicalData ?? 0),
  });
