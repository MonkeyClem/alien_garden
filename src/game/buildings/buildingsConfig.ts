import type { BuildingConfig } from "./buildings.type";


export const BUILDING_CONFIG = {
  bioBattery: {
    displayName: "BioBattery",
    description: "", 
    assetKey: "bioBattery",


    constructionTileId: 1,

    width: 350,
    height: 250,

    offsetX: -10,
    offsetY: -40,

    footPrint: {
      width: 7,
      height: 5,
    },

    cost: {
      biomass: 30,
    },
  },
} satisfies Record<string, BuildingConfig>;;