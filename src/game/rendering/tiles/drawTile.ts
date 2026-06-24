import { type Tile } from "../../type";

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

  const reactorMushroomStageOne = await loadImage("/assets/PNG/Assets/reactor_mushroom_stage_one.png")
  const reactorMushroomStageTwo = await loadImage ("/assets/PNG/Assets/reactor_mushroom_stage_two.png")
  const reactorMushroomStageThree = await loadImage ("/assets/PNG/Assets/reactor_mushroom_stage_three.png")

  return {
    bioBattery,
    bioPalmtree,
    trapStore,
    bioTerminal,

    reactorMushroomStageOne,
    reactorMushroomStageTwo,
    reactorMushroomStageThree
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


export const drawTile = (
  ctx: CanvasRenderingContext2D,
  tile: Tile,
) => {
  const tileColors = defineTileColors(tile);

  ctx.fillStyle = tileColors.fill;
  ctx.fill(tile.path);

  ctx.strokeStyle = tileColors.stroke;
  ctx.stroke(tile.path);
};
