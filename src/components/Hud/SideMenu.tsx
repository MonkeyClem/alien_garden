import type { Inventory, seedsType, Tile } from "../../game/type";
import InventoryComponents from "./Inventory/Inventory";

interface SideMenuProps {
  isOpen: boolean;
  selectedTile: Tile;
  inventory: Inventory;
  selectedSeed: seedsType;
  handlePlantSeed: (selectedSeed: seedsType, selectedTile: Tile) => void;
  handleSeedSelection: (selectedSeed: seedsType) => void;
}

export default function SideMenu({
  isOpen,
  selectedTile,
  inventory,
  selectedSeed,
  handleSeedSelection,
  handlePlantSeed,
}: SideMenuProps) {


  return (
    <div
      style={{
        background: "#101010",
        position: "absolute",
        height: isOpen ? "100vh" : 0,
        width: isOpen ? "15vw" : 0,
        right: 0,
      }}
    >
      {isOpen ? (
        ///DEBUG DIV 

        <>
          <p>Menu Ouvert</p>

          <h4>SELECTED TILE </h4>
          
          {selectedTile ? (
            <>
              {" "}
              <p>Tile ID : {selectedTile.id}</p>
              <p>Graine Plantée ? {selectedTile.hasSeed ? "oui" : "non"}</p>
              <p>Central pos x : {selectedTile.x}</p>
              <p>Central pos x : {selectedTile.y}</p>
              <p>GridX : {selectedTile.gridX}</p>
              <p>Grid Y : {selectedTile.gridY}</p>

            </>
          ) : (
            <p>No tile selected</p>
          )}
        </>

        ///DEBUG DIV 

      ) : null}
      ------------
      <InventoryComponents
        selectedSeed={selectedSeed}
        selectedTile={selectedTile}
        handlePlantSeed={handlePlantSeed}
        inventory={inventory}
        handleSeedSelection={handleSeedSelection}
      />
    </div>
  );
}
