import { useEffect, useRef, type SetStateAction } from "react";
import styles from "./canvas.module.css";
import findTile from "../../game/grid/findTile";
import { type selectionType } from "../../game/type";
import type { GameAssets } from "../../assets/assetTypes";
import type { Tile } from "../../game/grid/tiles.types";
import drawAllTiles, { drawTileState } from "../../rendering/tiles/drawAllTiles";
import { drawPlants } from "../../rendering/drawPlants";
import { initialDecorations } from "../../game/decorations/initialDecorations";
import { drawDecorations } from "../../rendering/drawDecorations";
import type { Plant, Species } from "../../game/plants/plants.type";
import type { Building } from "../../game/buildings/buildings.type";
import type { Decoration } from "../../game/decorations/decoration.type";
import { drawBuildings } from "../../rendering/buildings/drawBuilding";
import { findPlantOnTile } from "../../game/plants/findPlantOnTile";
import React from "react";
import { getAdjacentPlants } from "../../game/plants/getAdjacentPlants";
import { drawForeground } from "../../rendering/drawForeground";
import { drawMidground } from "../../rendering/drawMidground";
import { findWorldObjectOnTile } from "../../game/grid/findWorldObjectOnTile";
import drawBackground from "../../rendering/drawBackground";

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
  buildings: Building[];
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
  buildings,
  selectedSpecie,
}: Canvas) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const tilesRef = useRef<Tile[]>(tiles);
  const plantsRef = useRef<Plant[]>(plants);
  const assetsRef = useRef<GameAssets>(assets);
  const buildingsRef = useRef<Building[]>(buildings);

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
    buildingsRef.current = buildings;
  }, [buildings]);

  useEffect(() => {}, []);

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

      drawBackground(ctx, canvas, assetsRef.current)
      drawAllTiles(ctx, tilesRef.current, assets);
      drawMidground(ctx, canvas, assetsRef.current)

      drawTileState(ctx, tilesRef.current);
      drawDecorations(ctx, tilesRef.current, assetsRef.current);
      drawPlants(ctx, plantsRef.current, tilesRef.current, assetsRef.current);
      drawBuildings(
        ctx,
        buildingsRef.current,
        tilesRef.current,
        assetsRef.current,
      );
      drawForeground(ctx, canvas, assetsRef.current)

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

      const clickedObject = findWorldObjectOnTile(
        selectedTile.id,
        plants,
        buildings,
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

      const plant = findPlantOnTile(selectedTileId, plants)

      if(!plant) return 
        console.log(
            getAdjacentPlants(
              plant,
              plants,
              tiles,
            ),
          );


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
