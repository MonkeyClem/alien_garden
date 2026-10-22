import type { MissionId, MissionProgress, MissionObjectivesById } from "../mission.types";

export function completeObjective<M extends MissionId>(
  progress: MissionProgress,
  objectiveId: MissionObjectivesById[M],
): MissionProgress {
  if (progress[objectiveId]) return progress;

  return {
    ...progress,
    [objectiveId]: true,
  };
}
