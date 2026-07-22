import { useState, type Dispatch } from "react";
import React from "react";
import type { Tile } from "../../../game/grid/tiles.types";
import type { Species } from "../../../game/plants/plants.type";
import type { Inventory } from "../../../game/type";

interface InventoryProps {
  selectedTile: Tile | null;
  selectedSpecie: Species | null;
  inventory: Inventory;
  isSelectedTileOccupied: boolean;
  isInventoryOpen: boolean;
  setIsInventoryOpen : Dispatch<React.SetStateAction<boolean>>;
  handleSeedSelection: (selectedSpecie: Species) => void;
  handlePlantSeed: (selectedSpecie: Species, selectedTile: Tile) => void;
  setIsSelectedTileOccupied: (value: boolean) => void;
}

export type MenuItemStatus = "locked" | "unlocked";
export type MenuItemName = "Seeds" | "Weapons" | "Ressources";

export type MenuItems = { name: MenuItemName; status: MenuItemStatus };

export default function InventoryComponents({
  inventory,
  isInventoryOpen,
  handleSeedSelection,
  setIsInventoryOpen,
}: InventoryProps) {
  const menuItems: MenuItems[] = [
    { name: "Seeds", status: "unlocked" },
    { name: "Ressources", status: "locked" },
    { name: "Weapons", status: "locked" },
  ];


  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItems | null>(null)

  return isInventoryOpen ? (
    <div>
      <div style={{justifyContent:"space-between"}}> 
              <h3>Inventaire</h3>
              <button
                style={{position:"absolute", top: 10, right: 5}}
                 onClick={() => setIsInventoryOpen(!isInventoryOpen)}>X</button>

      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 2,
            background: "red",
          }}
        >
          {menuItems.map((item) =>
            item.status === "locked" ? (
              <button disabled>{item.name}</button>
            ) : (
              <button onClick={() => setSelectedMenuItem(item)}>{item.name}</button>
            ),
          )}



      
        </div>
        <div style={{ display: "flex", flex: 5, background: "#262525", gap:12 }}>

             {selectedMenuItem?.name === "Seeds" ? Object.entries(inventory.species).map(([specie, quantity]) => (
        <div >
          <button
            key={specie}
            onClick={() => handleSeedSelection(specie as Species)}
          >
            {specie} : {quantity}
          </button>
        </div>
      )) : null } 
        </div>
      </div>

   
    </div>
  ) : null;
}
