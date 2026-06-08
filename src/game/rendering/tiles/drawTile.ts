import { type Tile } from "../../type";
import type { GameAssets, seedsType } from "../../type";
// import bioBattery from "../../../assets/PNG/Assets/bioPalmtree.png";
// import lightTree from "../../../assets/PNG/Assets/Light_balls_tree1.png"


// const bioBatterySprite = new Image();
// bioBatterySprite.src = bioBattery;

// bioBatterySprite.loading = "eager";
// console.log("console.log(mushroomSprite.complete); ", bioBatterySprite.complete);


// const lightTreeSprite = new Image()
// lightTreeSprite.src = lightTree
// lightTreeSprite.loading = "eager"


export const loadImage = (src: string) : Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
        console.log("Image chargée :", src);
      resolve(image);
    }
    image.onerror =() =>{ 
            console.error("Image NON chargée :", src);
      reject(new Error(`Image introuvable : ${src}`));
      ;}

    image.src = src
  })
}


export const loadAssets = async() => {
  const bioBattery = await loadImage('/assets/PNG/Assets/biobattery.png')
  const bioPalmtree = await loadImage("/assets/PNG/Assets/bioPalmtree.png")

  return {
    bioBattery,
    bioPalmtree
  }

}



const defineSeedColors = (seedsType: seedsType) : {stroke : string } => {
  if (seedsType === "blue")
    return {
      stroke: "#8cdaf2",
    };

  if (seedsType === "green")
    return {
      stroke: "#0bdb7a",
    };

  if (seedsType === "red")
    return {
      stroke: "#b31010",
    };
  else{
    return {
      stroke : "#fff"
    }
  }
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

export const drawSeed = (ctx: CanvasRenderingContext2D, tile: Tile, assets : GameAssets) => {
  if (!tile.hasSeed ) return;

  const spriteSize = 192;
  
    // if (bioBatterySprite.complete && tile.seedsType === "green") {
    //   ctx.drawImage(
    //     bioBatterySprite,
    //     tile.x - spriteSize / 2,
    //     tile.y - spriteSize / 1.6,
    //     spriteSize,
    //     spriteSize,
    //   );
    //   return 
    // }else if(lightTreeSprite.complete && tile.seedsType === "blue") {
    //   ctx.drawImage(
    //     lightTreeSprite, 
    //     tile.x - spriteSize,
    //     tile.y  - spriteSize,
    //     spriteSize,
    //     spriteSize,
    //   )
    //   return
    // }else {
    //   ctx.beginPath();
    //   ctx.moveTo(tile.x, tile.y);
    //   ctx.lineTo(tile.x, tile.y - 5);


    //   if(!tile.seedsType) return
    //   const strokeStyle = defineSeedColors(tile.seedsType);

    //   ctx.strokeStyle = strokeStyle.stroke;

    //   ctx.stroke();
    //   ctx.closePath();
    // }
  
};

const drawPlant = (ctx: CanvasRenderingContext2D, tile: Tile, assets : GameAssets) => {
  drawSeed(ctx, tile, assets);
};



export const drawTile = (ctx: CanvasRenderingContext2D, tile: Tile,  assets : GameAssets) => {

  const tileColors = defineTileColors(tile);


  ctx.fillStyle = tileColors.fill;
  ctx.fill(tile.path);

  ctx.strokeStyle = tileColors.stroke;
  ctx.stroke(tile.path);

  drawPlant(ctx, tile, assets);
};
