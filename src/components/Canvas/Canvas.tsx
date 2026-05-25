import { useEffect, useRef } from "react";
import styles from "./canvas.module.css";
import type { Tile } from "../../game/type";
import findTile from "../../game/rendering/tiles/findTile";
import drawAllTiles from "../../game/rendering/tiles/drawAllTiles";
import drawBackground  from "../../game/rendering/background/drawBackground";

const tilePositions: Tile[] = [
  { id: 1, x: 600, y: 200, selected: false },
  { id: 2, x: 650, y: 215, selected: false },
  { id: 3, x: 700, y: 200, selected: false },
  { id: 4, x: 650, y: 185, selected: false },
];

export const halfWidth = 50;
export const halfHeight = 15;

export default function Canvas() {
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
    drawAllTiles(tilePositions, ctx);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground(ctx, canvas);
      drawAllTiles(tilePositions, ctx);

    };

    const handleMouseClick = (event: MouseEvent) => {
      const clickedPositions = { x: event.clientX, y: event.clientY };
      const selectedTileId = findTile(tilePositions, clickedPositions);

      if (!selectedTileId) return;

      const selectedTile = tilePositions.find((e) => selectedTileId === e.id);

      if (!selectedTile) return;

      tilePositions.forEach((e) => (e.selected = false));

      selectedTile.selected = true;

      render();
    };

    canvas.addEventListener("click", handleMouseClick);

    return () => {
      canvas.removeEventListener("click", handleMouseClick);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
    </>
  );
}
