import type {
  Inventory,
  Plant,
  Resources,
  Species,
  Tile,
} from "../../game/type";
import InventoryComponents from "./Inventory/Inventory";
import { getPlantStage } from "../Canvas/utils";

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
  handleRessourcesUpdate: () => void;
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
  setPlants,
  handleRessourcesUpdate,
}: SideMenuProps) {
  if (!selectedTile) return;

  const plantOnTile = plants.find((plant) => plant.tileId === selectedTile.id);

  if (plantOnTile && getPlantStage(plantOnTile) === 3) {
    setPlants((currentPlants) =>
      currentPlants.filter((plant : Plant) => plant.id !== plantOnTile.id),
    );

    handleRessourcesUpdate();

    return;
  }

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
              {" "}
              <p>Tile ID : {selectedTile.id}</p>
              <p>Graine Plantée ? {selectedTile.hasSeed ? "oui" : "non"}</p>
              <p>Central pos x : {selectedTile.x}</p>
              <p>Central pos x : {selectedTile.y}</p>
              <p>GridX : {selectedTile.gridX}</p>
              <p>Grid Y : {selectedTile.gridY}</p>
              {plantOnTile ?
            
               <div>Espèce présente sur la tuile  :{plantOnTile.species }</div> : "Aucune plante présente sur cette tuile"}
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
