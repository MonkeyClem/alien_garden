import type React from "react";
import type { GameAssets } from "../../../assets/assetTypes";
import type { Mission, MissionProgress } from "../../../game/missions/mission.types";

export interface MissionModalProps {
  assets: GameAssets;
  isMissionModalOpen: boolean;
  mission: Mission;
  progress: MissionProgress;
  // hasBioBatteryBeenAnalyzed: boolean;
  setIsMissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
