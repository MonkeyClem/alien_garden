import { useEffect, useRef, type SetStateAction } from "react";
import styles from "./canvas.module.css";
import findTile from "../../game/grid/findTile";
import drawBackground from "../../rendering/drawBackground";
import {
  type selectionType,
} from "../../game/type";
import type { GameAssets } from "../../assets/assetTypes";
import type { Tile } from "../../game/grid/tiles.types";
import drawAllTiles, { drawTileState } from "../../rendering/drawAllTiles";
import { drawPlants } from "../../rendering/drawPlants";
import { initialDecorations } from "../../game/decorations/initialDecorations";
import { drawDecorations } from "../../rendering/drawDecorations";
import { findDecorationOnTile } from "../../game/decorations/findDecorationOnTile";
import type { Plant } from "../../game/plants/plants.type";
import type { Building } from "../../game/buildings/buildings.type";
import { BUILDING_CONFIG } from "../../game/buildings/buildingsConfig";

interface Canvas {
  handleTileSelection: (tile: Tile) => void;
  setTiles: (value: Tile[] | ((prev: Tile[]) => Tile[])) => void;
  setSelectionType: React.Dispatch<SetStateAction<selectionType>>;
  setIsSelectedTileOccupied: (value: boolean) => void;
  tiles: Tile[];
  selectionType: selectionType;
  assets: GameAssets;
  plants: Plant[];
  buildings: Building[]
}


const findPlantOnTile = (selectedTileId: number, plants: Plant[]) => {
  const foundPlant = plants.find((plant) => plant.tileId === selectedTileId);

  if (foundPlant) {
    return true;
  } else {
    return false;
  }
};

const drawBuildings = (
  ctx: CanvasRenderingContext2D,
  buildings: Building[],
  tiles: Tile[],
  assets: GameAssets,
) => {
  buildings.forEach((building) => {
    const tile = tiles.find(
      (currentTile) => currentTile.id === building.tileId,
    );

    if (!tile) return;

    const config = BUILDING_CONFIG[building.type];
    const image = assets[config.assetKey];

    ctx.drawImage(
      image,
      tile.x - config.width / 2 + config.offsetX,
      tile.y - config.height + config.offsetY,
      config.width,
      config.height,
    );
  });
};


export default function Canvas({
  handleTileSelection,
  setTiles,
  setSelectionType,
  setIsSelectedTileOccupied,
  tiles,
  plants,
  assets,
  buildings,
}: Canvas) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const tilesRef = useRef<Tile[]>(tiles);
  const plantsRef = useRef<Plant[]>(plants);
  const assetsRef = useRef<GameAssets>(assets);
  const buildingsRef = useRef<Building[]>(buildings)

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
    buildingsRef.current = buildings
  }, [buildings])

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

 

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBackground(ctx, canvas);
      drawAllTiles(ctx, tilesRef.current, assets);
      drawTileState(ctx, tilesRef.current)
      drawDecorations(ctx, tilesRef.current, assetsRef.current);
      drawPlants(ctx, plantsRef.current, tilesRef.current, assetsRef.current);
      drawBuildings(ctx, buildingsRef.current, tilesRef.current, assetsRef.current);

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

      const selectedTile: Tile | undefined = tilesRef.current.find(
        (tile) => tile.id === selectedTileId,
      );

      if (!selectedTile) return;

      const clickedDecoration = findDecorationOnTile(
        selectedTileId,
        initialDecorations,
      );

      const clickedPlant = findPlantOnTile(selectedTileId, plantsRef.current);

      if (clickedDecoration) {
        console.log("Décoration sélectionnée :", clickedDecoration);
        setSelectionType("decoration");
        setIsSelectedTileOccupied(true);
      }

      if (clickedPlant) {
        setSelectionType("plant");
        setIsSelectedTileOccupied(true);
      }

      if (!clickedDecoration && !clickedPlant) {
        setSelectionType("empty");
        setIsSelectedTileOccupied(false);
      }

      setTiles((currentTiles) =>
        currentTiles.map((tile) => ({
          ...tile,
          selected: tile.id === selectedTileId,
        })),
      );

      handleTileSelection({
        ...selectedTile,
        selected: true,
      });
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

    canvas.addEventListener("click", handleMouseClick);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("click", handleMouseClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [setTiles, handleTileSelection, setSelectionType]);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
    </>
  );
}
