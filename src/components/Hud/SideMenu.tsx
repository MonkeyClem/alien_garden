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
  // ressources,
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

        {/* CREER LE COMPOSANT DEDIE 
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5vh",
            alignItems: "flex-start",
            borderRadius: "10px",

            justifyContent: "space-between",
            fontSize: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              background: "rgba(7, 13, 31, 0.94)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignContent: "baseline",
                background: "rgba(7, 13, 31, 0.94)",
                border: "2px solid #087E9B",
                padding: "0.25rem",
                borderRadius: "10px",
              }}
            >
              <img
                src={assets.bioMass.src}
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "cover",
                  imageRendering: "pixelated",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: 8,
                  paddingRight: 8,
                  textAlign: "left",
                }}
              >
                <p> Biomass</p>
                <p> {ressources.bioMass}</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                background: "rgba(7, 13, 31, 0.94)",
                border: "2px solid #087E9B",
                borderRadius: "10px",
                alignContent: "baseline",
                padding: "0.25rem",
              }}
            >
              <img
                src={assets.bioEnergy.src}
                style={{
                  width: "48",
                  height: "48px",
                  objectFit: "cover",
                  imageRendering: "pixelated",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: 8,
                  paddingRight: 8,
                  textAlign: "left",
                }}
              >
                <p> BioEnergie</p>
                <p>{ressources.bioEnergy}</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                background: "rgba(7, 13, 31, 0.94)",
                border: "2px solid #087E9B",
                borderRadius: "10px",
                alignContent: "baseline",
                padding: "0.25rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <img
                  src={assets.biologicalData.src}
                  style={{
                    width: "48px",
                    height: "48px",
                    objectFit: "contain",
                    imageRendering: "pixelated",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    paddingLeft: 8,
                    paddingRight: 8,
                  }}
                >
                  <p> Données </p>
                  <p> {ressources.biologicalData}</p>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        */}

        <div style={{ position: "absolute", left: 0, top: "5rem" }}>
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


        {/* CREER LE COMPOSANT DEDIE : MissionModal  */}
        {isMissionModalOpen ? (
          <div
            style={{
              fontSize: 14,
              borderRadius: 10,
              position: "absolute",
              padding: "0.5rem 1rem",
              right: 0,
              display: "flex",
              pointerEvents: "auto",
              flexDirection: "column",
              background: "rgba(7, 13, 31, 0.94)",
              border: "2px solid #087E9B",
              gap: "6px",
              textAlign: "left",
            }}
          >
            {" "}
            <div
              onClick={() => setIsMissionModalOpen(false)}
              style={{
                cursor: "pointer",
                height: 40,
                width: 40,
                backgroundImage: `url(${assets.close_mission_button.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
                right: -10,
                top: -10,
              }}
            ></div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  textTransform: "uppercase",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#76cee4",
                }}
              >
                Mission :{" "}
              </p>
              <p
                style={{
                  position: "relative",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  fontSize: 14,
                  right: 25,
                  color: "#4b9fb4",
                }}
              >
                Jour 1
              </p>
            </div>
            <div
              style={{
                display: "flex",
                borderTop: "0.5px solid #087E9B",
                borderBottom: "0.5px solid #087E9B",
              }}
            >
              <div>
                <p
                  style={{
                    color: "gold",
                  }}
                >
                  Activer la Bio Battery{" "}
                </p>
                <ul
                  style={{
                    padding: 0,
                    listStyle: "none",
                    textAlign: "left",
                    paddingBottom: "0.5rem",
                  }}
                >
                  <li>
                    <input type="checkbox" />
                    Observer la Bio Battery
                  </li>
                  <li>
                    {" "}
                    <input type="checkbox" />
                    Planter un Reactor Mushroom
                  </li>
                  <li>
                    <input type="checkbox" />
                    Etablir un lien synaptique entre le Reactor Muhsroom et la batterie
                  </li>
                </ul>
              </div>
              <div style={{ background: "black", width: "50%" }}>
                <img></img>
              </div>
            </div>
            <p style={{ fontWeight: 200, fontSize: 12 }}>
              Une première connexion vous permettra de comprendre les intéractions au sein
              de cet ecosystème
            </p>
          </div>
        ) : (
          <div
            style={{
              fontSize: 14,
              width: 350,
              padding: "0.5rem ",
              cursor: "pointer",
              borderRadius: 10,
              position: "absolute",
              display: "flex",
              right: 0,
              pointerEvents: "auto",
              flexDirection: "column",
              background: "rgba(7, 13, 31, 0.94)",
              border: "2px solid #087E9B",
              gap: 15,
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  textTransform: "uppercase",
                  fontWeight: 800,
                  color: "#76cee4",
                }}
              >
                Mission :{" "}
              </p>
              <p
                style={{
                  color: "gold",
                  position: "absolute",
                  right: "2rem",
                }}
              >
                Activer la Bio Battery{" "}
              </p>
              <div
                onClick={() => setIsMissionModalOpen(true)}
                style={{
                  height: 40,
                  width: 40,
                  backgroundImage: `url(${assets.open_mission_button.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "absolute",
                  right: -10,
                  top: -10,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>



      {selectedTile ? (
        <div
          style={{
            position: "absolute",
            left: 10,
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
