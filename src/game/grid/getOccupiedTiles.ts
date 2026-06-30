import { GRID_HEIGHT, GRID_WIDTH, HALF_TILE_HEIGHT } from "../rendering/tiles/drawScreenGrid";
import { type Decoration, type FootPrint, type Tile } from "../type";

export const getOccupiedTiles = (
  originTile: Tile,
  footPrint: FootPrint,
  tiles: Tile[],
): Tile[] => {
  return tiles.filter((tile) => {
    tile.gridX >= originTile.gridX &&
      tile.gridX < originTile.gridX + footPrint.width &&
      tile.gridY >= originTile.gridY &&
      tile.gridY < originTile.gridY + footPrint.height;
  });
};


// export const getDecorationOnTile = (
//   clickedTile: Tile,
//   decorations: Decoration[],
//   tiles: Tile[]
// ): Decoration | undefined => {
//   return decorations.find((decoration) => {
//     const originTile = tiles.find(
//       (tile) => tile.id === decoration.tileId
//     );

//     console.log("originTile : ", originTile)
//     if (!originTile) return false;

//     const occupiedTiles = getOccupiedTiles(
//       originTile,
//       decoration.footPrint,
//       tiles
//     );

//     return occupiedTiles.some(
//       (tile) => tile.id === clickedTile.id
//     );
//   });
// };


export const getDecorationOnTile = (
  originTile : Tile, 
  footPrint : FootPrint, 
) => {

  const occupiedTile = []

  for(let i = 0 ; i < footPrint.width; i ++){
    for(let j = 0; j < footPrint.height; j ++){
        const tileId = originTile.id + i + j * GRID_WIDTH
        occupiedTile.push(tileId)
    }
  }
  
console.log('occupiedTile :', occupiedTile)
return occupiedTile
  
}