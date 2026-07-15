import type { Inventory, Ressources } from "../../game/type";
import InventoryComponents from "./Inventory/Inventory";
import type React from "react";
import { useEffect, useState } from "react";
import { type selectionType } from "../../game/type";
import type { Tile } from "../../game/grid/tiles.types";
import { getPlantStage } from "../../game/plants/getPlantStage";
import type { Species, Plant } from "../../game/plants/plants.type";
import { initialDecorations } from "../../game/decorations/initialDecorations";
import { findDecorationOnTile } from "../../game/decorations/findDecorationOnTile";
import type { GameAssets } from "../../assets/assetTypes";

interface SideMenuProps {
  selectedTile: Tile | null;
  inventory: Inventory;
  assets: GameAssets;
  selectedSpecie: Species | null;
  handlePlantSeed: (selectedSpecie: Species, selectedTile: Tile) => void;
  handleSpecieSelection: (selectedSpecie: Species) => void;
  plants: Plant[];
  ressources: Ressources;
  handleRessourcesUpdate: (plantOnTile: Plant) => void;
  isHarvestButtonActive: boolean;
  setIsHarvestButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  selectionType: selectionType;
  isSelectedTileOccupied: boolean;
  setIsSelectedTileOccupied: (value: boolean) => void;
}

export default function SideMenu({
  selectedTile,
  inventory,
  assets,
  selectedSpecie,
  handleSpecieSelection,
  handlePlantSeed,
  plants,
  ressources,
  handleRessourcesUpdate,
  isHarvestButtonActive,
  setIsHarvestButtonActive,
  selectionType,
  isSelectedTileOccupied,
  setIsSelectedTileOccupied,
}: SideMenuProps) {

  const plantOnTile = selectedTile
    ? plants.find((plant) => plant.tileId === selectedTile.id)
    : null;

  const decorationOnTile = selectedTile && findDecorationOnTile(selectedTile.id, initialDecorations)

  useEffect(() => {
    setIsHarvestButtonActive(!!plantOnTile && getPlantStage(plantOnTile) === 3);
  }, [plantOnTile, plants, setIsHarvestButtonActive]);

  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false)

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
            <div>
              <h3>{decorationOnTile.assetKey}</h3>
              <img src={assets[decorationOnTile.assetKey].src}       
                    style={{
                    width: 124,
                    height: 124,
                    objectFit: "contain",
                    // imageRendering: "pixelated",
                  }}/>
            </div>
          )}
          {selectionType === "plant" && plantOnTile && (
            <div>
              <h3>Ceci est le HUD des plantes</h3>
              {plantOnTile?.species}
              {plantOnTile && <p>Plant Stage : {getPlantStage(plantOnTile)}</p>}
              <button
                onClick={() => handleRessourcesUpdate(plantOnTile)}
                disabled={!isHarvestButtonActive}
              >
                Récolter
              </button>
            </div>
          )}
          
          {selectionType === "empty" && (
            <div>
              <h3>Tuile Vide</h3>
              <button
              onClick={() => setIsInventoryOpen(true)}>Planter</button>
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
