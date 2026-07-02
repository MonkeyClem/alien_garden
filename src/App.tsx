import { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import SideMenu from "./components/Hud/SideMenu";
import {
  type Tile,
  type Inventory,
  type GameAssets,
  type Plant,
  type Resources,
} from "./game/type";
import { generateGrid } from "./game/rendering/tiles/drawScreenGrid";
import { loadAssets } from "./game/rendering/tiles/drawTile";
import { type Species, type selectionType } from './game/type';

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(true);
  const [tiles, setTiles] = useState<Tile[]>(() =>
    generateGrid(window.innerWidth),
  );
  const [inventory, setInventory] = useState<Inventory>({
    species : {
      reactorMushroom: 1,
      synapticVine: 2,
      crystalFlower: 1,
    },
  });

  

  const [ressources, setRessources] = useState<Resources>({
    bioMass : 0 
  })

  const [isHarvestButtonActive, setIsHarvestButtonActive] = useState<boolean>(false)



  const [plants, setPlants] = useState<Plant[]>([])
  const [assets, setAssets] = useState<GameAssets | null>(null);

    
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [selectedSpecie, setSelectedSpecie] = useState<Species | null>(null);

  const [selectionType, setSelectionType] = useState<selectionType>(null)
  const [isSelectedTileOccupied, setIsSelectedTileOccupied] = useState(false)


  useEffect(() => {
    loadAssets()
      .then(setAssets)
      .catch((error) =>
        console.error("Error lors du chargement des Assets : " + error),
      );
  }, []);




  const handlePlantSpecie = (selectedSpecies: Species, selectedTile: Tile) => {
    if (!selectedTile) return;

    const plant : Plant = {
      id : crypto.randomUUID, 
      tileId : selectedTile.id,
      species : selectedSpecies, 
      stage: 1,
      growth: 0,
      plantedAt: Date.now(), 
      isReadyToHarvest: false
    }

    setPlants((prev) => [...prev, plant])

  };

  const handleSpecieSelection = (clickedSpecie: Species) => {
    setSelectedSpecie(clickedSpecie);
  };





















  //TO DO : Ajouter un toggle
  const handleSideMenuOpen = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  const handleTileSelection = (tile: Tile) => {
    setSelectedTile(tile);
  };


  const handleRessourcesUpdate = (plantOnTile : Plant) => {
    
  setPlants((currentPlants) =>
      currentPlants.filter((plant : Plant) => plant.id !== plantOnTile?.id),
    );

    setRessources((currentRessources) => ({
      ...currentRessources,
      bioMass : currentRessources.bioMass + 10
    })
    )
  }

  

  return (
    <>
      {assets ? (
        <>
          <SideMenu
            isOpen={isSideMenuOpen}
            selectedTile={selectedTile}
            handlePlantSeed={handlePlantSpecie}
            inventory={inventory}
            selectedSpecie={selectedSpecie}
            handleSpecieSelection={handleSpecieSelection}
            plants={plants}
            ressources={ressources}
            handleRessourcesUpdate={handleRessourcesUpdate}
            setPlants={setPlants}
            isHarvestButtonActive={isHarvestButtonActive}
            setIsHarvestButtonActive={setIsHarvestButtonActive}
            selectionType={selectionType}
            isSelectedTileOccupied={isSelectedTileOccupied}
            setIsSelectedTileOccupied={setIsSelectedTileOccupied}
          />
          <Canvas
            handleSideMenuOpen={handleSideMenuOpen}
            handleTileSelection={handleTileSelection}
            setSelectionType={setSelectionType}
            setTiles={setTiles}
            setIsSelectedTileOccupied={setIsSelectedTileOccupied}
            selectionType={selectionType}
            plants={plants}
            assets={assets}
            tiles={tiles}
            
          />
        </>
      ) : (
        "Chargement.."
      )}
    </>
  );
}

export default App;
