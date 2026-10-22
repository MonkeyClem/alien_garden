import type { Mission, MissionId } from "./mission.types";

export const missionConfig: Record<MissionId, Mission<MissionId>> = {
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
  secondMission: {
    id: "secondMission",
    title: "Investiguer l'anomalie",
    description: "",
    objectives: [
      {
        id: "goToLocation",
        description: "Se rendre à la localisation donnée par l'équipe",
      },
    ],
  },
};
