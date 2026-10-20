import type { Mission, MissionProgress } from "../mission.types";

export default function missionComplete(mission: Mission, progress: MissionProgress) {
  return mission.objectives.every(objective => progress[objective.id] === true);
}
