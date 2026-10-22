import type { MissionId, Mission, MissionProgress } from "../mission.types";

export function isMissionCompleted<M extends MissionId>(
  mission: Mission<M>,
  progress: MissionProgress,
): boolean {
  return mission.objectives.every(objective => progress[objective.id] === true);
}
