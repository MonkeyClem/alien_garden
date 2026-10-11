import type { GameAssets } from "../../../../assets/assetTypes";
import type { Decoration } from "../../../../game/decorations/decoration.type";

export default interface DecorationHudProps {
  decorationOnTile: Decoration;
  assets: GameAssets;
}
