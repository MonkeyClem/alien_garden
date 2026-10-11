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
import type { Viewport } from "../../rendering/viewport/viewport.type";
import RessourcesScreen from "./RessourcesScreen/RessourcesScreen";
import MissionModal from "./MissionModal/MissionModal";

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
  unlockedSpecies: Species[];
  HUDContainerSize: Viewport | null;
  handlePlantSeed: (selectedSpecie: Species, selectedTile: Tile) => void;
  handleSpecieSelection: (selectedSpecie: Species) => void;
  handleRessourcesUpdate: (plantOnTile: Plant) => void;
  setIsHarvestButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelectedTileOccupied: (value: boolean) => void;
  setRessources: React.Dispatch<React.SetStateAction<Ressources>>;
  setUnlockedSpecies: React.Dispatch<React.SetStateAction<Species[]>>;
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
  unlockedSpecies,
  HUDContainerSize,
  handleSpecieSelection,
  handlePlantSeed,
  handleRessourcesUpdate,
  setIsHarvestButtonActive,
  setIsSelectedTileOccupied,
}: SideMenuProps) {
  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false);

  const [isMissionModalOpen, setIsMissionModalOpen] = useState<boolean>(true);

  const plantOnTile = selectedTile
    ? plants.find(plant => plant.tileId === selectedTile.id)
    : null;

  const decorationOnTile =
    selectedTile && findDecorationOnTile(selectedTile.id, initialDecorations);

  useEffect(() => {
    setIsHarvestButtonActive(!!plantOnTile && getPlantStage(plantOnTile) === 3);
  }, [plantOnTile, plants, setIsHarvestButtonActive]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          display: !HUDContainerSize ? "none" : "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          background: "transparent",

          pointerEvents: "none",
          left: HUDContainerSize?.offsetX ? HUDContainerSize.offsetX + 5 : 25,
          right: HUDContainerSize?.offsetX ? HUDContainerSize.offsetX + 5 : 25,

          top: HUDContainerSize?.offsetY ? HUDContainerSize.offsetY : 10,
          bottom: HUDContainerSize?.offsetY ? HUDContainerSize.offsetY : 0,

          borderRadius: "10px",
          marginTop: "2px",
        }}
      >
        <MissionModal
          assets={assets}
          isMissionModalOpen={isMissionModalOpen}
          setIsMissionModalOpen={setIsMissionModalOpen}
        />

        <RessourcesScreen
          HUDContainerSize={HUDContainerSize}
          ressources={ressources}
          assets={assets}
        />

        <InventoryComponents
          plants={plants}
          assets={assets}
          isInventoryOpen={isInventoryOpen}
          inventory={inventory}
          selectedSpecie={selectedSpecie}
          unlockedSpecies={unlockedSpecies}
          setIsInventoryOpen={setIsInventoryOpen}
          handleSeedSelection={handleSpecieSelection}
        />
      </div>

      {/* CREER LE COMPOSANT DEDIE  */}
      {selectedTile ? (
        <div
          style={{
            position: "absolute",
            display: !HUDContainerSize ? "none" : "flex",
            left: HUDContainerSize?.offsetX ? HUDContainerSize.offsetX + 5 : 25,
            right: HUDContainerSize?.offsetX ? HUDContainerSize.offsetX + 5 : 25,
            bottom: 25,
            padding: "0.5rem",
            background: "rgba(7, 13, 31, 0.94)",
            border: "2px solid #087E9B",
            width: "25vw",
            borderRadius: 10,
          }}
        >
          {selectionType === "decoration" && decorationOnTile && (
            <DecorationHud decorationOnTile={decorationOnTile} assets={assets} />
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
