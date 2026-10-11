import type React from "react";
import type { GameAssets } from "../../../assets/assetTypes";

export interface MissionModalProps {
  assets: GameAssets;
  isMissionModalOpen: boolean;
  setIsMissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
