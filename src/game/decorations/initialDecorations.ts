import type { Decoration } from "./decoration.type";

export const initialDecorations: Decoration[] = [
  {
    id: "bioBattery-1",
    tileId : 1,
    assetKey : "bioBattery",

    displayName: "Bio Battery",
    description:"A biological energy storage unit designed to collect and redistribute BioEnergy.",

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
    tileId : 589,
    assetKey : "bioPalmtree",

  displayName: "Purple Palm",
      description:"A native photosynthetic organism commonly found throughout the surrounding ecosystem.",

    gridX: 0,
    gridY: 12,
    width: 200,
    height: 220,
    offsetY: -80,
    offsetX: 0,
    footPrint : {width : 2, height : 2}
  },
    {
    id: "bioPalm-1",
    tileId : 344,
    assetKey : "bioPalmtree",

    displayName: "Purple Palm",
    description:"A native photosynthetic organism commonly found throughout the surrounding ecosystem.",

    gridX: 0,
    gridY: 12,
    width: 100,
    height: 110,
    offsetY: -40,
    offsetX: 0,
    footPrint : {width : 1, height : 1}
  },
  {
    id: "spacePod-1",
    tileId : 12,
    assetKey : "spacePod",

    displayName: "Expedition Pod",
    description:"A compact expedition module deployed to support planetary exploration.",

    gridX: 0,
    gridY: 12,
    width: 150,
    height: 120,
    offsetY: -35,
    offsetX: 0,
    footPrint : {width : 2, height : 2}
  }

  ,
    {
    id: "lake_1",
    tileId : 605,
    assetKey : "firstMapLake",

    displayName: "Bioluminescent Pool",
    description: "A natural pool rich in bioluminescent microorganisms. Its water emits a faint, persistent glow.",

    gridX: 1,
    gridY: 1,
    width: 400,
    height: 340,
    offsetY: 0,
    offsetX: 0,
    footPrint : {width : 15, height : 15}
  }


]
