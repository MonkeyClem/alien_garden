import { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import HUD from "./components/Hud/HUD";
import { type Ressources } from './game/type';
import { type selectionType } from "./game/type";
import type { GameAssets } from "./assets/assetTypes";
import { loadAssets } from "./assets/loadAssets";
import { generateGrid } from "./game/grid/generateGrid";
import type { Tile } from "./game/grid/tiles.types";
import { Species, type Plant, type ResourceYield } from "./game/plants/plants.type";
import { SPECIES_CONFIG } from "./game/plants/speciesConfig";
import type { Viewport } from "./rendering/viewport/viewport.type";
import type { Inventory } from "./game/inventory/inventory.type";
import hasPlayerEnoughSeeds from "./game/inventory/hasPlayerEnoughSeed";
import unlockAbilIty from "./game/abilities/unlockAbility";
import { type Ability, type UnlockedAbilities } from "./game/abilities/abilities.type";
import {
  BIO_BATTERY_ACTIVATION_COST,
  canActivateBioBattery,
} from "./game/canActivateBioBattery";

function App() {
  const [tiles, setTiles] = useState<Tile[]>(() => generateGrid());
  const [inventory, setInventory] = useState<Inventory>({
    species: {
      reactorMushroom: 1,
      synapticVine: 2,
      crystalFlower: 1,
    },
  });

  const [ressources, setRessources] = useState<Ressources>({
    bioMass: 0,
    bioEnergy: 0,
    biologicalData: 0,
  });

  const [isHarvestButtonActive, setIsHarvestButtonActive] = useState<boolean>(false);

  const [plants, setPlants] = useState<Plant[]>([]);
  const [assets, setAssets] = useState<GameAssets | null>(null);

  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [selectedSpecie, setSelectedSpecie] = useState<Species | null>(null);

  const [unlockedSpecies, setUnlockedSpecies] = useState<Species[]>([
    Species.REACTOR_MUSHROOM,
  ]);

  const [selectionType, setSelectionType] = useState<selectionType>(null);
  const [isSelectedTileOccupied, setIsSelectedTileOccupied] = useState(false);

  const [HUDContainerSize, setHUDContainerSize] = useState<Viewport | null>(null);

  const [unlockedAbilities, setUnlockedAbilities] = useState<UnlockedAbilities>({
    electricDischarge: false,
  });
  const [newlyUnlockedAbility, setNewlyUnlockedAbility] = useState<Ability | null>(null);

  const [bioBatteryStatus, setBioBatteryStatus] = useState<"inactive" | "active">(
    "inactive",
  );

  useEffect(() => {
    loadAssets()
      .then(setAssets)
      .catch(error => console.error("Error lors du chargement des Assets : " + error));
  }, []);

  const handlePlantSpecie = (selectedSpecies: Species, selectedTile: Tile) => {
    if (!selectedTile) return;

    if (!hasPlayerEnoughSeeds(inventory, selectedSpecies)) return;

    setInventory(previousInventory => ({
      species: {
        ...previousInventory.species,
        [selectedSpecies]: previousInventory.species[selectedSpecies] - 1,
      },
    }));

    const plant: Plant = {
      id: crypto.randomUUID(),
      tileId: selectedTile.id,
      specie: selectedSpecies,
      growth: 0,
      plantedAt: Date.now(),
      isReadyToHarvest: false,
    };

    setPlants(prev => [...prev, plant]);
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
    if (!plantOnTile.isReadyToHarvest) return;

    const plantSpecieData = SPECIES_CONFIG[plantOnTile.specie];

    if (!plantSpecieData.harvestable) return;

    const harvestYield: ResourceYield = plantSpecieData.harvestYield;

    setPlants(currentPlants =>
      currentPlants.filter((plant: Plant) => plant.id !== plantOnTile?.id),
    );
    setRessources(currentRessources => ({
      bioMass: currentRessources.bioMass + (harvestYield.bioMass ?? 0),
      bioEnergy: Math.min(
        currentRessources.bioEnergy + (harvestYield.bioEnergy ?? 0),
        15,
      ),
      biologicalData:
        currentRessources.biologicalData + (harvestYield.biologicalData ?? 0),
    }));

    if (
      plantOnTile.specie === "reactorMushroom" &&
      !unlockedAbilities.electricDischarge
    ) {
      setUnlockedAbilities(previousAbilities =>
        unlockAbilIty(previousAbilities, "electricDischarge"),
      );
      setNewlyUnlockedAbility("electricDischarge");
    }
  };

  const handleBioBatteryActivation = () => {
    const canBeActivated = canActivateBioBattery(
      bioBatteryStatus,
      unlockedAbilities,
      ressources,
    );
    if (canBeActivated === false) return;

    setBioBatteryStatus("active");
    setRessources(previousRessources => ({
      ...previousRessources,
      bioEnergy: previousRessources.bioEnergy - BIO_BATTERY_ACTIVATION_COST,
    }));

    window.alert("LA BIOBATTERY EST ACTIVEE !");
  };

  const handleHUDContainerSize = (viewport: Viewport) => {
    setHUDContainerSize(viewport);
  };

  useEffect(() => {
    if (newlyUnlockedAbility === null) return;

    const timeOutId = window.setTimeout(() => {
      setNewlyUnlockedAbility(null);
    }, 3500);

    return () => window.clearTimeout(timeOutId);
  }, [newlyUnlockedAbility]);

  return (
    <>
      {assets ? (
        <>
          <HUD
            selectedTile={selectedTile}
            inventory={inventory}
            selectedSpecie={selectedSpecie}
            plants={plants}
            ressources={ressources}
            isHarvestButtonActive={isHarvestButtonActive}
            selectionType={selectionType}
            assets={assets}
            isSelectedTileOccupied={isSelectedTileOccupied}
            unlockedSpecies={unlockedSpecies}
            HUDContainerSize={HUDContainerSize}
            newlyUnlockedAbility={newlyUnlockedAbility}
            bioBatteryStatus={bioBatteryStatus}
            unlockedAbilities={unlockedAbilities}
            setInventory={setInventory}
            setSelectionType={setSelectionType}
            setIsSelectedTileOccupied={setIsSelectedTileOccupied}
            handleSpecieSelection={handleSpecieSelection}
            setIsHarvestButtonActive={setIsHarvestButtonActive}
            handleRessourcesUpdate={handleRessourcesUpdate}
            setRessources={setRessources}
            handlePlantSeed={handlePlantSpecie}
            setUnlockedSpecies={setUnlockedSpecies}
            handleBioBatteryActivation={handleBioBatteryActivation}
          />
          <Canvas
            handleTileSelection={handleTileSelection}
            setSelectionType={setSelectionType}
            setTiles={setTiles}
            setIsSelectedTileOccupied={setIsSelectedTileOccupied}
            handlePlantSpecie={handlePlantSpecie}
            handleHUDContainerSize={handleHUDContainerSize}
            plants={plants}
            assets={assets}
            tiles={tiles}
            selectedSpecie={selectedSpecie}
            bioBatteryStatus={bioBatteryStatus}
          />
        </>
      ) : (
        "Chargement.."
      )}
    </>
  );
}

export default App;
