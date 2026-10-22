import type React from "react";
import type { GameAssets } from "../../../assets/assetTypes";
import type {
  Mission,
  MissionId,
  MissionsProgress,
} from "../../../game/missions/mission.types";

export interface MissionModalProps {
  assets: GameAssets;
  isMissionModalOpen: boolean;
  mission: Mission<MissionId>;
  // progress: MissionsProgress;
  missionsProgress: MissionsProgress;
  currentMissionId: MissionId;
  // currentMissionObjectives: {
  //   id: string;
  //   description: string;
  //   completed: boolean;
  // }[];
  // currentMissionProgress:
  //   MissionProgress<"firstMission"> | MissionProgress<"secondMission">;
  setIsMissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
