import type { GameAssets } from "../../../../assets/assetTypes";
import type { Transmission } from "../transmissions.type";

export interface TransmissionModalInterface {
  assets: GameAssets;
  currentTransmission: Transmission;
  setIsTransmissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
