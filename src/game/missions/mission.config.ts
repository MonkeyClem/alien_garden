import type { Mission, MissionId } from "./mission.types";

export const missionConfig: Record<MissionId, Mission> = {
  firstMission: {
    id: "firstMission",
    title: "Réactiver la Bio Battery",
    description: "Rétablissez l'alimentation énergétique de l'expédition.",
    objectives: [
      {
        id: "observeBioBattery",
        description: "Observer la Bio Battery",
      },
      {
        id: "harvestReactorMushroom",
        description: "Planter et récolter un Reactor Mushroom",
      },
      {
        id: "activateBioBattery",
        description: "Activer la Bio Battery",
      },
    ],
  },
};
