export type MissionId = "firstMission";

export type MissionObjectiveId =
  "observeBioBattery" | "harvestReactorMushroom" | "activateBioBattery";

export type MissionObjective = {
  id: MissionObjectiveId;
  description: string;
};

export type Mission = {
  id: MissionId;
  title: string;
  description: string;
  objectives: MissionObjective[];
};

export type MissionProgress = Record<MissionObjectiveId, boolean>;
