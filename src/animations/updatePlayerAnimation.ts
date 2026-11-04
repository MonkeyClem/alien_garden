import type { Player } from "../game/type";

export default function updatePlayerAnimation(player: Player, deltaTime: number) {
  const frameDuration = 1 / 6;

  if (player.playerPath.length === 0) return;
  player.animationElapsed += deltaTime;

  while (player.animationElapsed >= frameDuration) {
    player.animationFrame = (player.animationFrame + 1) % 4;
    player.animationElapsed -= frameDuration;
  }
}
