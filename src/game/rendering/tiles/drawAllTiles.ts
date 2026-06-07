import {  type Tile } from "../../type";
import { drawTile, drawTileEdges } from "./drawTile";


  export default function drawAllTiles (
    tilePositions: Tile[],
    ctx: CanvasRenderingContext2D,
  ) {


        // const decorations = initialDecorations
 
        // decorations.forEach(decoration => {
        //   const tile = tilePositions.find((tile) => tile.id === decoration.tileId)

        //   if(!tile) return 

        //   const img = new Image(); 
        //   img.src = decoration.asset


        //   ctx.drawImage(
        //     img, 
        //    tile.x - decoration.width / 1.5 ,
        //    tile.y - decoration.height * 1,
        //     100,
        //     158
        //   )
        // });

    tilePositions.forEach(tile => {
  drawTileEdges(ctx, tile, tilePositions)
})

    return tilePositions.forEach((tile) =>
      drawTile(
        ctx,
        tile
      ),
    );
  };

 