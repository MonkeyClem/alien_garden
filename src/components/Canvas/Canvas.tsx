import { useEffect, useRef } from "react";
import styles from "./canvas.module.css";
import findTile from "../../game/rendering/tiles/findTile";
import drawAllTiles from "../../game/rendering/tiles/drawAllTiles";
import drawBackground from "../../game/rendering/background/drawBackground";
import type { Tile } from "../../game/type";
import drawScreenGrid from "../../game/rendering/tiles/drawScreenGrid";

interface Canvas {
  handleSideMenuOpen: () => void;
  handleTileSelection: (tile : Tile) => void;
  setTiles: (tiles : Tile[]) => void;
  tiles : Tile[]
}
export default function Canvas(
    {
    handleSideMenuOpen,
    handleTileSelection,
    setTiles,
    tiles,
} : Canvas
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);


  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.log("Your browser does not support 2D canvas rendering.");
      return;
    }

    drawBackground(ctx, canvas);
    drawScreenGrid(ctx, tiles);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground(ctx, canvas);
      drawAllTiles(tiles, ctx);
    };

    const handleMouseClick = (event: MouseEvent) => {
      const clickedPositions = { x: event.clientX, y: event.clientY };
      const selectedTileId = findTile(tiles, clickedPositions, ctx);

      if (!selectedTileId) return;
      const selectedTile = tiles.find((e) => selectedTileId === e.id);
      
      if (!selectedTile) return;

      tiles.forEach((e) => (e.selected = false));
    
      selectedTile.selected = true;

      handleTileSelection(selectedTile)


      render();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const hoveredPos = { x: event.clientX, y: event.clientY };
      const hoveredTileId = findTile(tiles, hoveredPos, ctx);

      if (!hoveredTileId || hoveredTileId === undefined) return;

      const hoveredTile = tiles.find(
        (tile) => tile.id === hoveredTileId,
      );

      if (!hoveredTile) return;

      tiles.forEach((tile) => (tile.hovered = false));
      setTiles(tiles)

      hoveredTile.hovered = true;

      render();
    };

    canvas.addEventListener("click", handleMouseClick);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("click", handleMouseClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [tiles]);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
    </>
  );
}
