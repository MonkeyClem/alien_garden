import type { Decoration } from "./decoration.type";

export const initialDecorations: Decoration[] = [
  {
    id: "bioBattery-1",
    tileId : 2,
    assetKey : "bioBattery",
    gridX: 0,
    gridY: 12,
    width: 350,
    height: 250,
    offsetY: 0,
    offsetX: 0,
    footPrint:{width: 5, height : 5}
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
  }
]
