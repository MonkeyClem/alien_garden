import type { BuildingConfig } from "./buildings.type";

export const BUILDING_CONFIG = {
  bioBattery: {
    displayName: "BioBattery",
    description:
      "Une structure organique capable de stocker et redistribuer l’énergie biologique.",

    cost: {
      bioMass: 30,
    },
  },
} satisfies Record<string, BuildingConfig>;