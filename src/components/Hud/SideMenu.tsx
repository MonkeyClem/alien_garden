import type { Inventory, Ressources } from "../../game/type";
import InventoryComponents from "./Inventory/Inventory";
import type React from "react";
import { useEffect, useState } from "react";
import { type selectionType } from "../../game/type";
import type { Tile } from "../../game/grid/tiles.types";
import { getPlantStage } from "../../game/plants/getPlantStage";
import { Species, type Plant } from "../../game/plants/plants.type";
import { initialDecorations } from "../../game/decorations/initialDecorations";
import { findDecorationOnTile } from "../../game/decorations/findDecorationOnTile";
import type { GameAssets } from "../../assets/assetTypes";
import PlantHud from "./ContextualHuds/plantHud";
import DecorationHud from "./ContextualHuds/DecorationHud";

interface SideMenuProps {
  selectedTile: Tile | null;
  inventory: Inventory;
  assets: GameAssets;
  selectedSpecie: Species | null;
  selectionType: selectionType;
  isSelectedTileOccupied: boolean;
  plants: Plant[];
  ressources: Ressources;
  isHarvestButtonActive: boolean;
  handlePlantSeed: (selectedSpecie: Species, selectedTile: Tile) => void;
  handleSpecieSelection: (selectedSpecie: Species) => void;
  handleRessourcesUpdate: (plantOnTile: Plant) => void;
  setIsHarvestButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelectedTileOccupied: (value: boolean) => void;
}

export default function SideMenu({
  selectedTile,
  inventory,
  assets,
  selectedSpecie,
  plants,
  ressources,
  isHarvestButtonActive,
  isSelectedTileOccupied,
  selectionType,
  handleSpecieSelection,
  handlePlantSeed,
  handleRessourcesUpdate,
  setIsHarvestButtonActive,
  setIsSelectedTileOccupied,
}: SideMenuProps) {
  const plantOnTile = selectedTile
    ? plants.find((plant) => plant.tileId === selectedTile.id)
    : null;

  const decorationOnTile =
    selectedTile && findDecorationOnTile(selectedTile.id, initialDecorations);

  useEffect(() => {
    setIsHarvestButtonActive(!!plantOnTile && getPlantStage(plantOnTile) === 3);
  }, [plantOnTile, plants, setIsHarvestButtonActive]);

  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false);

  return (
    <>
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          height: "5vh",
          left: 3,
          right: 3,
          background: "black",
          border: "2px solid purple",
          borderRadius: "10px",
          marginTop: "2px",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <div> Biomass : {ressources.bioMass}</div>
          <div> BioEnergie : {ressources.bioMass}</div>
          <div> Données : {ressources.bioMass}</div>
        </div>

        <div style={{ display: "flex", gap: "5px" }}>
          <button> MENU</button>
          <button> PARAMETRES</button>
          <button> SAVE</button>
        </div>
      </div>

      {selectedTile ? (
        <div
          style={{
            background: "#000",
            position: "absolute",
            top: 50,
            height: "30vh",
            width: "25vw",
            border: "2px solid purple",
            right: 0,
          }}
        >
          {selectionType === "decoration" && decorationOnTile && (
            <DecorationHud
            decorationOnTile={decorationOnTile}
            assets={assets}
            />
          )}

          {selectionType === "plant" && (
            <PlantHud
              plantOnTile={plantOnTile}
              handleRessourcesUpdate={handleRessourcesUpdate}
              isHarvestButtonActive={isHarvestButtonActive}
            />
          )}

          {selectionType === "empty" && (
            <div>
              <h3>Tuile Vide</h3>
              <button onClick={() => setIsInventoryOpen(true)}>Planter</button>
              <InventoryComponents
                isInventoryOpen={isInventoryOpen}
                isSelectedTileOccupied={isSelectedTileOccupied}
                selectedSpecie={selectedSpecie}
                selectedTile={selectedTile}
                handlePlantSeed={handlePlantSeed}
                inventory={inventory}
                handleSeedSelection={handleSpecieSelection}
                setIsSelectedTileOccupied={setIsSelectedTileOccupied}
                ressources={ressources}
              />
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
