export type BuildingConfig = {
  displayName: string;
  description: string;
  cost: {
    bioMass?: number;
    bioEnergy?: number;
    biologicalData?: number;
  };
};

