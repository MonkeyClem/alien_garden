import type { GameAssets } from "../../../assets/assetTypes";
import type { Ressources } from "../../../game/type";
import type { Viewport } from "../../../rendering/viewport/viewport.type";

export interface RessourcesScreenProps {
  HUDContainerSize: Viewport | null;
  assets: GameAssets;
  ressources: Ressources;
}
