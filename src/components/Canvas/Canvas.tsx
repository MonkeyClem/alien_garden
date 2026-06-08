import { useEffect, useRef } from "react";
import styles from "./canvas.module.css";
import findTile from "../../game/rendering/tiles/findTile";
import drawAllTiles from "../../game/rendering/tiles/drawAllTiles";
import drawBackground from "../../game/rendering/background/drawBackground";
import { initialDecorations, type GameAssets, type Tile } from "../../game/type";
import { HALF_TILE_HEIGHT } from "../../game/rendering/tiles/drawScreenGrid";

interface Canvas {
  handleSideMenuOpen: () => void;
  handleTileSelection: (tile: Tile) => void;
  setTiles: (value: Tile[] | ((prev: Tile[]) => Tile[])) => void;
  tiles: Tile[];
  assets : GameAssets
}

const imageCache = new Map<string, HTMLImageElement>();

// const preload_image = (src: string): Promise<HTMLImageElement> => {
//   const cached = imageCache.get(src);
//   if (cached?.complete) return Promise.resolve(cached);

//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.src = src;

//     img.onload = () => {
//       imageCache.set(src, img);
//       resolve(img);
//     };

//     img.onerror = reject;
//   });
// };


const drawDecoration = (
  ctx: CanvasRenderingContext2D,
  tilePositions: Tile[],
) => {
  initialDecorations.forEach((decoration) => {
    const tile = tilePositions.find(
      (tile) =>
        tile.gridX === decoration.gridX && tile.gridY === decoration.gridY,
    );

    if (!tile) return;

    const img = imageCache.get(decoration.asset);

    if (!img || !img.complete) return;

    ctx.drawImage(
      img,
      tile.x - 150 / 2,
      tile.y - 150 + HALF_TILE_HEIGHT * 2.75,
      150,
      150,
    );
  });
};
export default function Canvas({
  // handleSideMenuOpen,
  handleTileSelection,
  setTiles,
  tiles,
  assets
}: Canvas) {
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

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground(ctx, canvas);
      drawAllTiles(tiles, ctx, assets);
      drawDecoration(ctx, tiles);
    };

    render()
    // Promise.all(
    //   initialDecorations.map((decoration) => preload_image(decoration.asset)),
    // ).then(() => {
    //   render();
    // });

    const handleMouseClick = (event: MouseEvent) => {
      const clickedPositions = { x: event.clientX, y: event.clientY };
      const selectedTileId = findTile(tiles, clickedPositions, ctx);

      if (!selectedTileId) return;
      const selectedTile = tiles.find((e) => selectedTileId === e.id);

      if (!selectedTile) return;

      tiles.forEach((e) => (e.selected = false));
      selectedTile.selected = true;
      handleTileSelection(selectedTile);

      setTiles((currentTiles: Tile[]) =>
        currentTiles.map((tile: Tile) => ({
          ...tile,
          selected: tile.id === selectedTileId,
        })),
      );

      handleTileSelection({
        ...selectedTile,
        selected: true,
      });

      render();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const hoveredPos = { x: event.clientX, y: event.clientY };
      const hoveredTileId = findTile(tiles, hoveredPos, ctx);

      if (!hoveredTileId || hoveredTileId === undefined) return;

      const hoveredTile = tiles.find((tile) => tile.id === hoveredTileId);

      if (!hoveredTile) return;

      tiles.forEach((tile) => (tile.hovered = false));
      setTiles(tiles);

      hoveredTile.hovered = true;

      render();
    };

    canvas.addEventListener("click", handleMouseClick);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("click", handleMouseClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [tiles,]);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
    </>
  );
}
