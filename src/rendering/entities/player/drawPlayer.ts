import type { GameAssets } from "../../../assets/assetTypes";
import { HALF_TILE_WIDTH, HALF_TILE_HEIGHT } from "../../../game/grid/grid.constants";
import { GRID_ORIGIN_X, GRID_ORIGIN_Y } from "../../../game/world/world.constant";
import getPlayerSprite from "./getPlayerSprite";
import type { Player } from "../../../game/type";

export default function drawPlayer(
  ctx: CanvasRenderingContext2D,
  assets: GameAssets,
  player: Player,
) {
  const worldX = GRID_ORIGIN_X + (player.gridX - player.gridY) * HALF_TILE_WIDTH;

  const worldY = GRID_ORIGIN_Y + (player.gridX + player.gridY) * HALF_TILE_HEIGHT;

  const width = 48;
  const height = 64;

  // const width = 56;
  // const height = 72;

  const x = worldX - width / 2;
  const y = worldY - height;

  if (player.playerPath.length === 0) {
    player.animationState = "static";
  } else {
    player.animationState = "walking";
  }

  const image = getPlayerSprite(player, assets);

  if (player.direction === "left" && player.animationState === "walking") {
    console.log({
      selectedImage: image.src,
      expectedImage: assets.walking_character_left.src,
      isLeftSheet: image === assets.walking_character_left,
    });
  }

  const frameWidth = image.width / 4;
  const frameHeight = image.height;

  const frameIndex = player.animationFrame;

  const sourceX = frameIndex * frameWidth;
  const sourceY = 0;

  if (player.animationState === "static") {
    ctx.drawImage(image, x, y + 5, width, height);
    return;
  }

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    frameWidth,
    frameHeight,
    x,
    y + 5,
    width,
    height,
  );
}
