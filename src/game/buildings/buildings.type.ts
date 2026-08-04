import type { AssetsKey } from "../../assets/assetTypes";
import type { FootPrint } from "../decorations/decoration.type";

export type BuildingType = "bioBattery";

export type Building = {
  id: string;
  type: BuildingType;
  tileId: number;
};

export type BuildingConfig = {
  displayName: string;
  description: string;
  assetKey: AssetsKey;
  constructionTileId: number,

  width : number, 
  height: number, 

    offsetX: number,
    offsetY: number,

    footPrint : FootPrint;

  cost: {
    biomass?: number;
    bioEnergy?: number;
    biologicalData?: number;
  };
};

