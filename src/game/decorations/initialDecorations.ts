import type { Decoration } from "./decoration.type";

export const initialDecorations: Decoration[] = [
  {
    id: "bioBattery-1",
    tileId : 1,
    assetKey : "bioBattery",
    gridX: 0,
    gridY: 12,
    width: 350,
    height: 250,
    offsetY: -5,
    offsetX: -40,
    footPrint:{width: 7, height : 5}
  },
  {
    id: "bioPalm-1",
    tileId : 9,
    assetKey : "bioTerminal",
    gridX: 0,
    gridY: 12,
    width: 225,
    height: 200,
    offsetY: -10,
    offsetX: 0,
    footPrint : {width : 2, height : 2}
  },
  {
    id: "spacePod-1",
    tileId : 12,
    assetKey : "spacePod",
    gridX: 0,
    gridY: 12,
    width: 150,
    height: 120,
    offsetY: -20,
    offsetX: 0,
    footPrint : {width : 2, height : 2}
  }

]
