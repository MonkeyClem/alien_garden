import { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import SideMenu from "./components/Hud/SideMenu";
import { type Inventory, type Ressources } from "./game/type";
import { type selectionType } from "./game/type";
import type { GameAssets } from "./assets/assetTypes";
import { loadAssets } from "./assets/loadAssets";
import { generateGrid } from "./game/grid/generateGrid";
import type { Tile } from "./game/grid/tiles.types";
import type { Plant, ResourceYield, Species } from "./game/plants/plants.type";
import { SPECIES_CONFIG } from "./game/plants/speciesConfig";
import type { Building } from "./game/buildings/buildings.type";

function App() {
  const [tiles, setTiles] = useState<Tile[]>(() =>
    generateGrid(window.innerWidth),
  );
  const [inventory, setInventory] = useState<Inventory>({
    species: {
      reactorMushroom: 1,
      synapticVine: 2,
      crystalFlower: 1,
    },
  });

  const [ressources, setRessources] = useState<Ressources>({
    biomass: 0,
    bioEnergy: 0,
    biologicalData: 0,
  });

  const [isHarvestButtonActive, setIsHarvestButtonActive] =
    useState<boolean>(false);

  const [plants, setPlants] = useState<Plant[]>([]);
  const [assets, setAssets] = useState<GameAssets | null>(null);

  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [selectedSpecie, setSelectedSpecie] = useState<Species | null>(null);

  const [selectionType, setSelectionType] = useState<selectionType>(null);
  const [isSelectedTileOccupied, setIsSelectedTileOccupied] = useState(false);

  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    loadAssets()
      .then(setAssets)
      .catch((error) =>
        console.error("Error lors du chargement des Assets : " + error),
      );
  }, []);

  const handlePlantSpecie = (selectedSpecies: Species, selectedTile: Tile) => {
    if (!selectedTile) return;

    const plant: Plant = {
      id: crypto.randomUUID(),
      tileId: selectedTile.id,
      specie: selectedSpecies,
      growth: 0,
      plantedAt: Date.now(),
      isReadyToHarvest: false,
    };

    setPlants((prev) => [...prev, plant]);
    setSelectionType("plant");
  };

  const handleSpecieSelection = (clickedSpecie: Species) => {
    setSelectedSpecie(clickedSpecie);
  };

  const handleTileSelection = (tile: Tile) => {
    setSelectedTile(tile);
  };

  //the plantOnTile parameter is the harvested Plant
  const handleRessourcesUpdate = (plantOnTile: Plant) => {
    console.log("Nous sommes dans handler")
    if (!plantOnTile.isReadyToHarvest) return;

    console.log("plante prête pour la récolte")
    const plantSpecieData = SPECIES_CONFIG[plantOnTile.specie];


    if (!plantSpecieData.harvestable) return;
    console.log("La plante est récoltable")

    const harvestYield: ResourceYield = plantSpecieData.harvestYield;

    if (!plantSpecieData) return;

    setPlants((currentPlants) =>
      currentPlants.filter((plant: Plant) => plant.id !== plantOnTile?.id),
    );
    setRessources((currentRessources) => ({
      biomass: currentRessources.biomass + (harvestYield.biomass ?? 0),
      bioEnergy: currentRessources.bioEnergy + (harvestYield.bioEnergy ?? 0),
      biologicalData:
        currentRessources.biologicalData + (harvestYield.biologicalData ?? 0),
    }));
  };

  return (
    <>
      {assets ? (
        <>
          <SideMenu
            selectedTile={selectedTile}
            handlePlantSeed={handlePlantSpecie}
            inventory={inventory}
            selectedSpecie={selectedSpecie}
            handleSpecieSelection={handleSpecieSelection}
            plants={plants}
            ressources={ressources}
            handleRessourcesUpdate={handleRessourcesUpdate}
            isHarvestButtonActive={isHarvestButtonActive}
            setIsHarvestButtonActive={setIsHarvestButtonActive}
            selectionType={selectionType}
            isSelectedTileOccupied={isSelectedTileOccupied}
            setIsSelectedTileOccupied={setIsSelectedTileOccupied}
            assets={assets}
            buildings={buildings}
            setBuildings={setBuildings}
            setRessources={setRessources}
          />
          <Canvas
            handleTileSelection={handleTileSelection}
            setSelectionType={setSelectionType}
            setTiles={setTiles}
            setIsSelectedTileOccupied={setIsSelectedTileOccupied}
            selectionType={selectionType}
            plants={plants}
            assets={assets}
            tiles={tiles}
            buildings={buildings}
          />
        </>
      ) : (
        "Chargement.."
      )}
    </>
  );
}

export default App;
