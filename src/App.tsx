import { useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import SideMenu from "./components/Hud/SideMenu";
import type { Tile } from "./game/type";
import { generateGrid } from "./game/rendering/tiles/drawScreenGrid";

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(true);
  const [tiles, setTiles] = useState<Tile[]>(() =>
    generateGrid(window.innerWidth),
  );
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);

  //TO DO : Ajouter un toggle
  const handleSideMenuOpen = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  const handleTileSelection = (tile: Tile) => {
    setSelectedTile(tile);
  };

  const handlePlantSeed = (selectedTile: Tile) => {
    setTiles((currentTiles) => {
      const updatedTiles = currentTiles.map((tile) =>
        tile.id === selectedTile.id ? { ...tile, hasSeed: true } : tile,
      );

      const updatedSelectedTile =
        updatedTiles.find((tile) => tile.id === selectedTile.id) ?? null;

      setSelectedTile(updatedSelectedTile);

      return updatedTiles;
    });
  };

  return (
    <>
      <SideMenu
        isOpen={isSideMenuOpen}
        selectedTile={selectedTile}
        handlePlantSeed={handlePlantSeed}
      />
      <Canvas
        handleSideMenuOpen={handleSideMenuOpen}
        handleTileSelection={handleTileSelection}
        setTiles={setTiles}
        tiles={tiles}
      />
    </>
  );
}

export default App;
