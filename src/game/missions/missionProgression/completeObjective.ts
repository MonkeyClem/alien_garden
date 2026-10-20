import type { MissionProgress, MissionObjectiveId } from "../mission.types";

export function completeObjective(
  progress: MissionProgress,
  objectiveId: MissionObjectiveId,
): MissionProgress {
  if (progress[objectiveId]) return progress;

  return {
    ...progress,
    [objectiveId]: true,
  };
}
