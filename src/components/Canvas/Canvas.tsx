import { useEffect, useRef } from "react";
import styles from "./canvas.module.css";
import findTile from "../../game/rendering/tiles/findTile";
import drawAllTiles from "../../game/rendering/tiles/drawAllTiles";
import drawBackground  from "../../game/rendering/background/drawBackground";
import drawScreenGrid, { generateGrid, } from "../../game/rendering/tiles/drawScreenGrid";



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
    // drawAllTiles(tilePositions, ctx);


    const tilePositions = generateGrid(canvas.width)
    drawScreenGrid(ctx, tilePositions)

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground(ctx, canvas);
      drawAllTiles(tilePositions, ctx);

    };

    const handleMouseClick = (event: MouseEvent) => {
      const clickedPositions = { x: event.clientX, y: event.clientY };
      const selectedTileId = findTile(tilePositions, clickedPositions, ctx);

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
