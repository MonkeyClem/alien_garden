import { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import SideMenu from "./components/Hud/SideMenu";
import {
  type Tile,
  type Inventory,
  type seedsType,
  type GameAssets,
} from "./game/type";
import { generateGrid } from "./game/rendering/tiles/drawScreenGrid";
import { loadAssets } from "./game/rendering/tiles/drawTile";

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(true);
  const [tiles, setTiles] = useState<Tile[]>(() =>
    generateGrid(window.innerWidth),
  );
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);

  const [assets, setAssets] = useState<GameAssets | null>(null);

  useEffect(() => {
    loadAssets()
      .then(setAssets)
      .catch((error) =>
        console.error("Error lors du chargement des Assets : " + error),
      );
  }, []);

  const [inventory, setInventory] = useState<Inventory>({
    seeds: {
      green: 1,
      red: 2,
      blue: 1,
    },
  });

  const [selectedSeed, setSelectedSeed] = useState<seedsType | null>(null);

  const handleSeedsCount = (selectedSeed: seedsType) => {
    setInventory((prev) => ({
      ...prev,
      seeds: {
        ...prev.seeds,
        [selectedSeed]: prev.seeds[selectedSeed] - 1,
      },
    }));
  };

  const handlePlantSeed = (selectedSeed: seedsType, selectedTile: Tile) => {
    if (!selectedTile) return;
    if (inventory.seeds[selectedSeed] <= 0) {
      window.alert("Vous n'avez pas suffisament de graines");
      return;
    }

    setTiles((currentTiles) => {
      const updatedTiles = currentTiles.map((tile) =>
        tile.id === selectedTile.id
          ? { ...tile, hasSeed: true, seedsType: selectedSeed }
          : tile,
      );

      const updatedSelectedTile =
        updatedTiles.find((tile) => tile.id === selectedTile.id) ?? null;
      setSelectedTile(updatedSelectedTile);

      return updatedTiles;
    });

    handleSeedsCount(selectedSeed);
  };

  const handleSeedSelection = (clickedSeed: seedsType) => {
    setSelectedSeed(clickedSeed);
  };

  //TO DO : Ajouter un toggle
  const handleSideMenuOpen = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  const handleTileSelection = (tile: Tile) => {
    setSelectedTile(tile);
  };

  return (
    <>
      {assets ? (
        <>
          {" "}
          <SideMenu
            isOpen={isSideMenuOpen}
            selectedTile={selectedTile}
            handlePlantSeed={handlePlantSeed}
            inventory={inventory}
            selectedSeed={selectedSeed}
            handleSeedSelection={handleSeedSelection}
          />
          <Canvas
            handleSideMenuOpen={handleSideMenuOpen}
            handleTileSelection={handleTileSelection}
            setTiles={setTiles}
            assets={assets}
            tiles={tiles}
          />{" "}
        </>
      ) : (
        "Chargement"
      )}
    </>
  );
}

export default App;
