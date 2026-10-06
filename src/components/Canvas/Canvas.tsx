import { useEffect, useRef, type SetStateAction } from "react";
import styles from "./canvas.module.css";
import findTile from "../../game/grid/findTile";
import { type selectionType } from "../../game/type";
import type { GameAssets } from "../../assets/assetTypes";
import type { Tile } from "../../game/grid/tiles.types";
import drawAllTiles, {
  drawTileState,
} from "../../rendering/tiles/drawAllTiles";
import { initialDecorations } from "../../game/decorations/initialDecorations";
import type { Plant, Species } from "../../game/plants/plants.type";
import type { Decoration } from "../../game/decorations/decoration.type";
import { findPlantOnTile } from "../../game/plants/findPlantOnTile";
import React from "react";
import { findWorldObjectOnTile } from "../../game/grid/findWorldObjectOnTile";
import drawBackground from "../../rendering/environment/drawBackground";
import { drawForeground } from "../../rendering/environment/drawForeground";
import { drawMidground } from "../../rendering/environment/drawMidground";
import { WORLD_WIDTH, WORLD_HEIGHT } from "../../game/world/world.constant";
import { drawDepthSortedWorld } from "../../rendering/drawDepthSortedWorld";

export type PlantDepthItem = {
  type: "plant";
  depth: number;
  plant: Plant;
  tile: Tile;
};
export type DecorationDepthItem = {
  type: "decoration";
  depth: number;
  decoration: Decoration;
  tile: Tile;
};
export type DepthItem = PlantDepthItem | DecorationDepthItem;

export type Viewport = {
  scale: number;
  offsetX: number;
  offsetY: number;
};

const getViewport = (canvasWidth: number, canvasHeight: number): Viewport => {
  const scale = Math.min(
    canvasWidth / WORLD_WIDTH,
    canvasHeight / WORLD_HEIGHT,
  );

  return {
    scale,
    offsetX: (canvasWidth - WORLD_WIDTH * scale) / 2,
    offsetY: (canvasHeight - WORLD_HEIGHT * scale) / 2,
  };
};

interface Canvas {
  handleTileSelection: (tile: Tile) => void;
  setTiles: (value: Tile[] | ((prev: Tile[]) => Tile[])) => void;
  setSelectionType: React.Dispatch<SetStateAction<selectionType>>;
  setIsSelectedTileOccupied: (value: boolean) => void;
  handlePlantSpecie: (selectedSpecies: Species, selectedTile: Tile) => void;
  tiles: Tile[];
  selectionType: selectionType;
  assets: GameAssets;
  plants: Plant[];
  decorations: Decoration[];
  selectedSpecie: Species | null;
}

export default function Canvas({
  handleTileSelection,
  setTiles,
  setSelectionType,
  setIsSelectedTileOccupied,
  handlePlantSpecie,
  tiles,
  plants,
  assets,
  selectedSpecie,
}: Canvas) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const tilesRef = useRef<Tile[]>(tiles);
  const plantsRef = useRef<Plant[]>(plants);
  const assetsRef = useRef<GameAssets>(assets);

  useEffect(() => {
    tilesRef.current = tiles;
  }, [tiles]);

  useEffect(() => {
    plantsRef.current = plants;
  }, [plants]);

  useEffect(() => {
    assetsRef.current = assets;
  }, [assets]);




  


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const viewport = getViewport(canvas.width, canvas.height);

    ctx.translate(viewport.offsetX, viewport.offsetY);
    ctx.scale(viewport.scale, viewport.scale);

    const render = () => {
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBackground(ctx, assetsRef.current);
      drawAllTiles(ctx, tilesRef.current, assets);
      drawMidground(ctx, assetsRef.current);
      
      drawTileState(ctx, tilesRef.current);

      drawDepthSortedWorld(ctx, plantsRef.current, initialDecorations, tilesRef.current, assetsRef.current)

      drawForeground(ctx, assetsRef.current);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleMouseClick = (event: MouseEvent) => {
      const clickedPosition = {
        x: event.clientX,
        y: event.clientY,
      };

      const selectedTileId = findTile(tilesRef.current, clickedPosition, ctx);

      if (!selectedTileId) return;

      setTiles((currentTiles) =>
        currentTiles.map((tile) => ({
          ...tile,
          selected: tile.id === selectedTileId,
        })),
      );

      const selectedTile: Tile | undefined = tilesRef.current.find(
        (tile) => tile.id === selectedTileId,
      );

      if (!selectedTile) return;

      const clickedObject = findWorldObjectOnTile(
        selectedTile.id,
        plants,
        initialDecorations,
      );

      handleTileSelection(selectedTile);

      if (clickedObject) {
        setSelectionType(clickedObject.type);
        setIsSelectedTileOccupied(true);
      } else {
        setSelectionType("empty");
        setIsSelectedTileOccupied(false);
      }

      if (selectedSpecie && !clickedObject) {
        handlePlantSpecie(selectedSpecie, selectedTile);
        return;
      }

      const plant = findPlantOnTile(selectedTileId, plants);

      if (!plant) return;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const hoveredPosition = {
        x: event.clientX,
        y: event.clientY,
      };

      const hoveredTileId = findTile(tilesRef.current, hoveredPosition, ctx);

      setTiles((currentTiles) =>
        currentTiles.map((tile) => ({
          ...tile,
          hovered: tile.id === hoveredTileId,
        })),
      );
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    canvas.addEventListener("click", handleMouseClick);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("click", handleMouseClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [
    setTiles,
    handleTileSelection,
    setSelectionType,
    window.innerHeight,
    window.innerWidth,
  ]);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
    </>
  );
}
