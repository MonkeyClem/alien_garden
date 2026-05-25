import { halfWidth, halfHeight } from "../../../components/Canvas/Canvas";
import type { Tile } from "../../type";

 export default function findTile  (
    tilePositions: Tile[],
    clickedPos: { x: number; y: number },
  )  {
    const xPosToFind = clickedPos.x;
    const yPosToFind = clickedPos.y;

    for (let i = 0; i < tilePositions.length; i++) {
      if (
        xPosToFind > tilePositions[i].x - halfWidth &&
        xPosToFind < tilePositions[i].x + halfWidth &&
        yPosToFind > tilePositions[i].y - halfHeight &&
        yPosToFind < tilePositions[i].y + halfHeight
      ) {
        return tilePositions[i].id;
      }
    }
  };
