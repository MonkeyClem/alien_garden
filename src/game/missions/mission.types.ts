export type MissionId = "firstMission" | "secondMission";

export type MissionObjectivesById = {
  firstMission: "observeBioBattery" | "harvestReactorMushroom" | "activateBioBattery";
  secondMission: "goToLocation";
};

export type MissionObjective<M extends MissionId> = {
  id: MissionObjectivesById[M];
  description: string;
};

export type Mission<M extends MissionId> = {
  id: MissionId;
  title: string;
  description: string;
  objectives: MissionObjective<M>[];
};

export type MissionProgress = Record<string, boolean>;

export type MissionsProgress = Record<MissionId, MissionProgress>;
