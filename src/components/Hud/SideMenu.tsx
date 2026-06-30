import type {
  Inventory,
  Plant,
  Resources,
  Species,
  Tile,
} from "../../game/type";
import InventoryComponents from "./Inventory/Inventory";
import { getPlantStage } from "../Canvas/utils";
import type React from "react";
import { useEffect, type SetStateAction } from "react";
import { type selectedTileType } from '../../game/type';

interface SideMenuProps {
  isOpen: boolean;
  selectedTile: Tile | null;
  inventory: Inventory;
  selectedSpecie: Species | null;
  handlePlantSeed: (selectedSpecie: Species, selectedTile: Tile) => void;
  handleSpecieSelection: (selectedSpecie: Species) => void;
  plants: Plant[];
  setPlants : React.Dispatch<React.SetStateAction<Plant[]>>,
  ressources: Resources;
  handleRessourcesUpdate: (plantOnTile: Plant) => void;
  isHarvestButtonActive : boolean;
  setIsHarvestButtonActive : React.Dispatch<React.SetStateAction<boolean>>
  selectedTileType : selectedTileType
  setSelectedTileType : React.Dispatch<SetStateAction<selectedTileType>>
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
  selectedTileType
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
          TODO : IMPLEMENTER TOGGLE / SYSTEME DE BOUTON POUR OUVRIR DIFFERENTS
          MENUS (inventaire, propriétés d'une plante cliquée, etc..)
          <p>Menu Ouvert</p>
          <h4>SELECTED TILE </h4>
          {selectedTile ? (
            <>
              
              {selectedTileType}
              <p>Tile ID : {selectedTile.id}</p>
              <p>Graine Plantée ? {selectedTile.hasSeed ? "oui" : "non"}</p>
              <p>Central pos x : {selectedTile.x}</p>
              <p>Central pos x : {selectedTile.y}</p>
              <p>GridX : {selectedTile.gridX}</p>
              <p>Grid Y : {selectedTile.gridY}</p>
              {plantOnTile ?
            
               <div>Espèce présente sur la tuile  :{plantOnTile.species }
                    <button 
                    disabled={!isHarvestButtonActive}
                    onClick={() => handleRessourcesUpdate(plantOnTile)}>
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
        selectedSpecie={selectedSpecie}
        selectedTile={selectedTile}
        handlePlantSeed={handlePlantSeed}
        inventory={inventory}
        handleSeedSelection={handleSpecieSelection}
        ressources={ressources}
      />

        
    </div>
  );
}
