import type { Inventory, Ressources } from "../../game/type";
import type React from "react";
import { useEffect, useState } from "react";
import { type selectionType } from "../../game/type";
import type { Tile } from "../../game/grid/tiles.types";
import { getPlantStage } from "../../game/plants/getPlantStage";
import { Species, type Plant } from "../../game/plants/plants.type";
import { initialDecorations } from "../../game/decorations/initialDecorations";
import { findDecorationOnTile } from "../../game/decorations/findDecorationOnTile";
import type { GameAssets } from "../../assets/assetTypes";
import DecorationHud from "./ContextualHuds/DecorationHud";
import EmptyTileHud from "./ContextualHuds/EmptyTileHud";
import InventoryComponents from "./Inventory/Inventory";
import PlantHud from "./ContextualHuds/PlantHud";

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          height: "5vh",
          left: 25,
          right: 25,
          top: 10,
          borderRadius: "10px",
          marginTop: "2px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection:"column",
            alignItems:"flex-start",
            // gap: "2px",
            background: "black",
            border: "2px solid purple",
            paddingLeft:"0.5rem",
            paddingRight:"0.5rem"
          }}
        >
          <h5 style={{background:"purple", margin:0, textAlign: "center"}}>Resources</h5>
          <p> Biomass : {ressources.biomass}</p>
          <p> BioEnergie : Bio Energie</p>
          <p> Données : {ressources.biologicalData}</p>
        </div>

        <div style={{ display: "flex", gap: "5px" , height: "100%"}}>
          <button> PARAMETRES</button>
          <button> SAVE</button>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 15, right: 10 }}>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsInventoryOpen(!isInventoryOpen)}
          style={{
            padding: 0,
            border: isHovered ? "2px solid #9b5cff" : "2px solid transparent",
            borderRadius: 8,
            background: "transparent",
            cursor: "pointer",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.15s ease, border 0.15s ease",
          }}
          // style={{padding:0, border: "0px solid purple"}}
        >
          <img
            src={assets.inventoryIcon.src}
            style={{
              display: "block",
              objectFit: "cover",
              height: 75,
              width: 75,
            }}
          />
          {/* {isInventoryOpen ? "Fermer l'inventaire" : "Ouvrir l'inventaire"}   */}
        </button>
      </div>

      {isInventoryOpen ? (
        <div
          style={{
            position: "absolute",
            zIndex: 10001,
            background: "black",
            bottom: 100,
            top: 100,
            left: 100,
            right: 100,
            border: "2px solid purple",
            borderRadius: 10,
          }}
        >
          <InventoryComponents
            isInventoryOpen={isInventoryOpen}
            inventory={inventory}
            isSelectedTileOccupied={isSelectedTileOccupied}
            selectedSpecie={selectedSpecie}
            selectedTile={selectedTile}
            setIsInventoryOpen={setIsInventoryOpen}
            handlePlantSeed={handlePlantSeed}
            handleSeedSelection={handleSpecieSelection}
            setIsSelectedTileOccupied={setIsSelectedTileOccupied}
          />
        </div>
      ) : null}

      {selectedTile ? (
        <div
          style={{
            background: "#000",
            position: "absolute",
            top: 50,
            height: "5vh",
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
              isHarvestButtonActive={isHarvestButtonActive}
              plantOnTile={plantOnTile}
              handleRessourcesUpdate={handleRessourcesUpdate}
            />
          )}

          {selectionType === "empty" && (
            <EmptyTileHud
              handlePlantSeed={handlePlantSeed}
              isSelectedTileOccupied={isSelectedTileOccupied}
              selectedSpecie={selectedSpecie}
              setIsSelectedTileOccupied={setIsSelectedTileOccupied}
              isInventoryOpen={isInventoryOpen}
              selectedTile={selectedTile}
              setIsInventoryOpen={setIsInventoryOpen}
            />
          )}
        </div>
      ) : null}
    </>
  );
}
