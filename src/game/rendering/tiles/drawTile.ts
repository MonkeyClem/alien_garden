import { type Tile } from "../../type";
import type { GameAssets } from "../../type";

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      console.log("Image chargée :", src);
      resolve(image);
    };
    image.onerror = () => {
      console.error("Image NON chargée :", src);
      reject(new Error(`Image introuvable : ${src}`));
    };

    image.src = src;
  });
};

export const loadAssets = async () => {
  const bioBattery = await loadImage("/assets/PNG/Assets/biobattery.png");
  const bioPalmtree = await loadImage("/assets/PNG/Assets/bioPalmtree.png");
  const trapStore = await loadImage("/assets/PNG/Assets/trapStore.png")
  const bioTerminal = await loadImage("/assets/PNG/Assets/bioTerminal.png")

  return {
    bioBattery,
    bioPalmtree,
    trapStore,
    bioTerminal,
  };
};


const defineTileColors = (tile: Tile) => {
  if (tile.selected) {
    return {
      fill: "#6d4ac9",
      stroke: "#9f7aea",
    };
  }

  if (tile.hovered) {
    return {
      fill: "#3b2359",
      stroke: "#1f3d63",
    };
  }

  return {
    fill: "#230127",
    stroke: "rgba(120, 220, 255, 0.12)",
  };
};

export const drawSeed = (
  ctx: CanvasRenderingContext2D,
  tile: Tile,
  assets: GameAssets,
) => {
  if (!tile.hasSeed) return;

  const spriteSize = 192;

  if (tile.seedsType === "green") {
    ctx.drawImage(
      assets.bioPalmtree,
      tile.x - spriteSize / 2,
      tile.y - spriteSize / 1.6,
      spriteSize,
      spriteSize,
    );
  }
};

const drawPlant = (
  ctx: CanvasRenderingContext2D,
  tile: Tile,
  assets: GameAssets,
) => {
  drawSeed(ctx, tile, assets);
};

export const drawTile = (
  ctx: CanvasRenderingContext2D,
  tile: Tile,
  assets: GameAssets,
) => {
  const tileColors = defineTileColors(tile);

  ctx.fillStyle = tileColors.fill;
  ctx.fill(tile.path);

  ctx.strokeStyle = tileColors.stroke;
  ctx.stroke(tile.path);

  drawPlant(ctx, tile, assets);
};
