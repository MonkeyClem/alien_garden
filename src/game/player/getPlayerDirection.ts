import type { Player, PlayerDirections } from "../type";

export default function getPlayerDirection(player: Player): PlayerDirections {
  if (player.targetGridX > player.gridX) {
    return "right";
  }
  if (player.targetGridX < player.gridX) {
    return "left";
  }
  if (player.targetGridY > player.gridY) {
    return "bottom";
  }
  if (player.targetGridY < player.gridY) {
    return "top";
  } else return player.direction;
}
