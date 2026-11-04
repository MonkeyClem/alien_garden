import type { GameAssets } from "../../../assets/assetTypes";
import type { Player } from "../../../game/type";

export default function getPlayerSprite(
  player: Player,
  assets: GameAssets,
): HTMLImageElement {
  if (player.animationState === "static") return assets.playable_char_static;
  switch (player.direction) {
    case "bottom":
      return assets.walking_character_bottom;
    case "top":
      return assets.walking_character_top;
    case "left":
      return assets.walking_character_left;
    case "right":
      return assets.walking_character;
    default:
      return assets.playable_char_static;
  }
}
