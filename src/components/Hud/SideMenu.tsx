import type {
  Inventory,
  Ressources,
} from "../../game/type";
import InventoryComponents from "./Inventory/Inventory";
import type React from "react";
import { useEffect } from "react";
import { type selectionType } from '../../game/type';
import type { Tile } from "../../game/grid/tiles.types";
import { getPlantStage } from "../../game/plants/getPlantStage";
import type { Species, Plant } from "../../game/plants/plants.type";

interface SideMenuProps {
  isOpen: boolean;
  selectedTile: Tile | null;
  inventory: Inventory;
  selectedSpecie: Species | null;
  handlePlantSeed: (selectedSpecie: Species, selectedTile: Tile) => void;
  handleSpecieSelection: (selectedSpecie: Species) => void;
  plants: Plant[];
  setPlants : React.Dispatch<React.SetStateAction<Plant[]>>,
  ressources: Ressources;
  handleRessourcesUpdate: (plantOnTile: Plant) => void;
  isHarvestButtonActive : boolean;
  setIsHarvestButtonActive : React.Dispatch<React.SetStateAction<boolean>>
  selectionType : selectionType;
  isSelectedTileOccupied: boolean,
  setIsSelectedTileOccupied : (value : boolean) => void
}

export default function SideMenu({
  isOpen,
  selectedTile,
  inventory,
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
  setIsSelectedTileOccupied
}: SideMenuProps) {


  const plantOnTile = selectedTile
  ? plants.find((plant) => plant.tileId === selectedTile.id)
  : null;

useEffect(() => {
  setIsHarvestButtonActive(
    !!plantOnTile && getPlantStage(plantOnTile) === 3
  );
}, [plantOnTile, setIsHarvestButtonActive]);


  
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
          {/* TODO : IMPLEMENTER TOGGLE / SYSTEME DE BOUTON POUR OUVRIR DIFFERENTS
          MENUS (inventaire, propriétés d'une plante cliquée, etc..)
          <p>Menu Ouvert</p>
          <h4>SELECTED TILE </h4> */}
          {selectedTile ? (
            <>
              
              {selectionType}
              <br/>
              {/* <p>Tile ID : {selectedTile.id}</p>
              <p>Central pos x : {selectedTile.x}</p>
              <p>Central pos x : {selectedTile.y}</p>
              <p>GridX : {selectedTile.gridX}</p>
              <p>Grid Y : {selectedTile.gridY}</p> */}
              {plantOnTile ?
            
               <div>Espèce présente sur la tuile  :{plantOnTile.species }
                    <button 
                    disabled={!isHarvestButtonActive}
                    onClick={() =>
                     {
                      handleRessourcesUpdate(plantOnTile)
                    }
                     }>
                    Récolter le {selectedSpecie}
                  </button>
              
                  </div> : "Aucune plante présente sur cette tuile"
               
               }
                 
             
                

            </>
          ) : (
            <p>No tile selected</p>
          )}
        </>
      ) : ///DEBUG DIV

      null}
      ------------
      <InventoryComponents
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
  );
}
