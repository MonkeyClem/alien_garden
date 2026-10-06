import { type Dispatch } from "react";
import React from "react";
import { Species, type Plant } from "../../../game/plants/plants.type";
import type { Inventory } from "../../../game/type";
import type { AssetsKey, GameAssets } from "../../../assets/assetTypes";

interface InventoryProps {
  plants: Plant[];
  assets: GameAssets;
  inventory: Inventory;
  isInventoryOpen: boolean;
  unlockedSpecies: Species[];
  selectedSpecie: Species | null;
  setIsInventoryOpen: Dispatch<React.SetStateAction<boolean>>;
  handleSeedSelection: (selectedSpecie: Species) => void;
}

const getSpecieAssetKey = (specie: Species): AssetsKey => {
  if (specie === "reactorMushroom") {
    return "reactorMushroomStageThree";
  }

  if (specie === "synapticVine") {
    return "synapticVineStageTwo";
  }

  if (specie === "crystalFlower") {
    return "synapticVineStageTwo";
  }
  throw new Error(
    `No assets key available for the specie ${specie} to be display in inventory`,
  );
};

export default function InventoryComponents({
  inventory,
  selectedSpecie,
  assets,
  handleSeedSelection,
}: InventoryProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",

        background: "rgba(7, 13, 31, 0.94)",
        border: "2px solid #087E9B",
        borderRadius: "8px",

        padding: "10px",
      }}
    >
      <p           style={{
                  textTransform: "uppercase",
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#89dcf1",
                }}>Seeds</p>

      {Object.entries(inventory.species).map(([key, amount]) => {
        const species = key as Species;
        const isSelected = species === selectedSpecie;
        const imageSrc = getSpecieAssetKey(species);

        return (
          <button
            key={species}
            onClick={() => handleSeedSelection(species)}
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",

              padding: "8px 12px",

              background: isSelected
                ? "rgba(34, 230, 242, 0.16)"
                : "rgba(21, 34, 59, 0.8)",

              color: isSelected ? "#7AFAFF" : "#E8EDF5",

              border: isSelected ? "2px solid #22E6F2" : "2px solid #33465F",

              borderRadius: "5px",

              boxShadow: isSelected
                ? `
                  0 0 3px #7AFAFF,
                  0 0 8px rgba(34, 230, 242, 0.55),
                  inset 0 0 8px rgba(34, 230, 242, 0.16)
                `
                : "none",

              cursor: "pointer",

              textAlign: "left",
            }}
          >
            <img
              src={assets[imageSrc].src}
              alt={species}
              style={{
                width: "48",
                height: "48px",
                objectFit: "cover",
                imageRendering: "pixelated",
              }}
            />
            <div style={{ position: "absolute", bottom: 0, right: 0 }}>
              <p>{amount}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
