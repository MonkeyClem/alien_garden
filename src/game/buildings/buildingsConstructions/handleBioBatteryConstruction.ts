import type { SetStateAction } from "react";
import type { Ressources } from "../../type";
import type { Building } from "../buildings.type";
import { BUILDING_CONFIG } from "../buildingsConfig";
import { canAffordBuilding } from "../canAffordBuilding";
import type React from "react";
import { substractBuildingCost } from "../substractBuildingCost";


//This file should be later replaced with an orchestrative function in charge of the dispatch, depending on the building the user wants to build
export const handleBioBatteryConstruction = (
    buildings : Building[],
    ressources : Ressources,
    setRessources : React.Dispatch<SetStateAction<Ressources>>,
    setBuildings : React.Dispatch<SetStateAction<Building[]>>
  ) => {
    const config = BUILDING_CONFIG.bioBattery;

    const buildingCost : Partial<Ressources> = config.cost

    const bioBatteryAlreadyExists = buildings.some(
      (building) => building.type === "bioBattery",
    );

    if (bioBatteryAlreadyExists) return;

    if (!canAffordBuilding(ressources, buildingCost))
      return;

    setRessources((currentRessources) =>
      substractBuildingCost(currentRessources, buildingCost),
    );

    setBuildings((currentBuildings) => [
      ...currentBuildings,
      {
        id: crypto.randomUUID(),
        type: "bioBattery",
        tileId : config.constructionTileId,
      },
    ]);
  };