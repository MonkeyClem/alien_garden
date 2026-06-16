import { useEffect, useRef } from "react";
import styles from "./canvas.module.css";
import findTile from "../../game/rendering/tiles/findTile";
import drawAllTiles from "../../game/rendering/tiles/drawAllTiles";
import drawBackground from "../../game/rendering/background/drawBackground";
import { initialDecorations, type GameAssets, type Tile } from '../../game/type';
import { HALF_TILE_HEIGHT, HALF_TILE_WIDTH } from "../../game/rendering/tiles/drawScreenGrid";
import { loadAssets } from "../../game/rendering/tiles/drawTile";

interface Canvas {
  handleSideMenuOpen: () => void;
  handleTileSelection: (tile: Tile) => void;
  setTiles: (value: Tile[] | ((prev: Tile[]) => Tile[])) => void;
  tiles: Tile[];
  assets : GameAssets
}


const drawDecoration = (
  ctx: CanvasRenderingContext2D,
  tilePositions: Tile[],
  assets: GameAssets
) => {
  initialDecorations.forEach((decoration) => {
  
    const tile = tilePositions.find((tile) => tile.id === decoration.tileId)

    if (!tile) return;

    const image = assets[decoration.assetKey]

    const x =
      tile.x -
      decoration.width / 2 +
      decoration.offsetX;

    const y =
      tile.y -
      decoration.height / 2 +
      HALF_TILE_HEIGHT +
      decoration.offsetY;

    ctx.drawImage(
      image,
      x,
      y,
      decoration.width,
      decoration.height,
    );

  });
};


export default function Canvas({
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
      drawDecoration(ctx, tiles, assets);
    };

    render()

    const handleMouseClick = (event: MouseEvent) => {
      const clickedPositions = { x: event.clientX, y: event.clientY };
      const selectedTileId = findTile(tiles, clickedPositions, ctx);

      if (!selectedTileId) return;

      setTiles((currentTiles: Tile[]) =>
        currentTiles.map((tile: Tile) => ({
          ...tile,
          selected: tile.id === selectedTileId,
        })),
      );

      const selectedTile = tiles.find((e) => selectedTileId === e.id);

      if(!selectedTile) return

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
  }, [tiles]);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
    </>
  );
}
