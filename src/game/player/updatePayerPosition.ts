import type { Player } from "../type";
import getPlayerDirection from "./getPlayerDirection";

export default function updatePlayerPosition(player: Player, deltaTime: number) {
  if (player.playerPath.length === 0) {
    player.animationState = "static";
    return;
  } else {
    player.animationState = "walking";
  }

  const nextTile = player.playerPath[0];

  player.targetGridX = nextTile.gridX;
  player.targetGridY = nextTile.gridY;

  const playerDirection = getPlayerDirection(player);
  player.direction = playerDirection;

  const distanceLeftX = player.targetGridX - player.gridX;
  const distanceLeftY = player.targetGridY - player.gridY;

  const distanceLeft = Math.hypot(distanceLeftX, distanceLeftY);
  const maxDistance = player.speed * deltaTime;

  if (distanceLeft <= maxDistance) {
    player.gridX = player.targetGridX;
    player.gridY = player.targetGridY;

    player.playerPath.shift();

    return;
  }
  const directionX = distanceLeftX / distanceLeft;
  const directionY = distanceLeftY / distanceLeft;

  player.gridX += directionX * maxDistance;
  player.gridY += directionY * maxDistance;
}
