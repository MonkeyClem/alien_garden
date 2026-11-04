import { useEffect, useRef } from "react";
import styles from "./canvas.module.css";
import findTile from "../../game/grid/findTile";
import type { GameAssets } from "../../assets/assetTypes";
import type { Tile } from "../../game/grid/tiles.types";
import drawAllTiles, { drawTileState } from "../../rendering/tiles/drawAllTiles";
import { initialDecorations } from "../../game/decorations/initialDecorations";
import type { Plant } from "../../game/plants/plants.type";
import { findPlantOnTile } from "../../game/plants/findPlantOnTile";
import { findWorldObjectOnTile } from "../../game/grid/findWorldObjectOnTile";
import drawBackground from "../../rendering/environment/drawBackground";
import { drawForeground } from "../../rendering/environment/drawForeground";
import { drawMidground } from "../../rendering/environment/drawMidground";
import { drawDepthSortedWorld } from "../../rendering/entities/drawDepthSortedWorld";
import { drawWorldBorders } from "../../rendering/environment/drawWorldBorders";
import { getViewport } from "../../rendering/viewport/getViewport";
import { screenToWorld } from "../../rendering/viewport/screenToWorld";
import type { CanvasProps } from "./Canvas.interface";
import { getOccupiedTileIds } from "../../game/decorations/getOccupiedTilesIds";
import findPlayerPath from "../../game/pathfinding/findPlayerPath";
import type { Player } from "../../game/type";
import updatePlayerAnimation from "../../animations/updatePlayerAnimation";
import updatePlayerPosition from "../../game/player/updatePayerPosition";

export default function Canvas({
  handleTileSelection,
  setTiles,
  setSelectionType,
  setIsSelectedTileOccupied,
  handlePlantSpecie,
  handleHUDContainerSize,
  handleBioBatteryAnalyze,
  tiles,
  plants,
  assets,
  selectedSpecie,
  bioBatteryStatus,
}: CanvasProps) {
  const occupiedTileIds = new Set(
    initialDecorations.flatMap(decoration => getOccupiedTileIds(decoration)),
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const tilesRef = useRef<Tile[]>(tiles);
  const plantsRef = useRef<Plant[]>(plants);
  const assetsRef = useRef<GameAssets>(assets);

  const playerRef = useRef<Player>({
    gridX: 2,
    gridY: 9,
    targetGridX: 2,
    targetGridY: 9,
    speed: 4,

    animationElapsed: 0,
    animationFrame: 0,
    animationState: "static",

    isMoving: false,
    direction: "right",

    playerPath: [],
  });

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
    let previousTimeStamp: number | null = null;
    const render = (timeStamp: number) => {
      const deltaTime =
        previousTimeStamp === null
          ? 0
          : Math.min((timeStamp - previousTimeStamp) / 1000, 0.05);

      previousTimeStamp = timeStamp;
      updatePlayerPosition(playerRef.current, deltaTime);
      updatePlayerAnimation(playerRef.current, deltaTime);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const viewport = getViewport(canvas.width, canvas.height);

      handleHUDContainerSize(viewport);

      ctx.save();

      ctx.translate(viewport.offsetX, viewport.offsetY);
      ctx.scale(viewport.scale, viewport.scale);

      drawBackground(ctx, assetsRef.current);
      drawAllTiles(ctx, tilesRef.current, assets);
      drawMidground(ctx, assetsRef.current);

      drawTileState(ctx, tilesRef.current);

      drawDepthSortedWorld(
        ctx,
        timeStamp,
        plantsRef.current,
        initialDecorations,
        tilesRef.current,
        assetsRef.current,
        bioBatteryStatus,
        playerRef.current,
      );
      // drawPlayer(ctx, assets, player);

      drawForeground(ctx, assetsRef.current);

      ctx.restore();

      drawWorldBorders(ctx, canvas.width, canvas.height, viewport);

      animationFrameId = requestAnimationFrame(render);
    };

    // render();
    animationFrameId = requestAnimationFrame(render);
    console.log("animationFrameId : ", animationFrameId);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [assets, bioBatteryStatus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleMouseClick = (event: MouseEvent) => {
      const worldRelativePositions = screenToWorld(canvas, event);

      const clickedPosition = {
        x: worldRelativePositions.worldX,
        y: worldRelativePositions.worldY,
      };

      const selectedTileId = findTile(tilesRef.current, clickedPosition, ctx);

      if (!selectedTileId) return;

      setTiles(currentTiles =>
        currentTiles.map(tile => ({
          ...tile,
          selected: tile.id === selectedTileId,
        })),
      );

      const selectedTile: Tile | undefined = tilesRef.current.find(
        tile => tile.id === selectedTileId,
      );

      if (!selectedTile) return;

      const clickedObject = findWorldObjectOnTile(
        selectedTile.id,
        plantsRef.current,
        initialDecorations,
      );

      handleTileSelection(selectedTile);

      if (clickedObject) {
        setSelectionType(clickedObject.type);
        setIsSelectedTileOccupied(true);
        if (clickedObject.type === "decoration") {
          if (clickedObject.object.assetKey === "bioBattery") {
            handleBioBatteryAnalyze(true);
          }
        }
      } else {
        setSelectionType("empty");
        setIsSelectedTileOccupied(false);
      }

      if (selectedSpecie && !clickedObject) {
        handlePlantSpecie(selectedSpecie, selectedTile);
        return;
      }

      const playerTile = tiles.find(
        tile =>
          tile.gridX === playerRef.current.gridX &&
          tile.gridY === playerRef.current.gridY,
      );

      if (!clickedObject && playerTile) {
        const playerPath = findPlayerPath(
          playerTile,
          selectedTile,
          tiles,
          occupiedTileIds,
        );

        playerRef.current.playerPath = playerPath.slice(1);
      }

      const plant = findPlantOnTile(selectedTileId, plants);

      if (!plant) return;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const worldRelativePositions = screenToWorld(canvas, event);

      const hoveredPosition = {
        x: worldRelativePositions.worldX,
        y: worldRelativePositions.worldY,
      };

      const hoveredTileId = findTile(tilesRef.current, hoveredPosition, ctx);

      setTiles(currentTiles =>
        currentTiles.map(tile => ({
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

    canvas.addEventListener("click", handleMouseClick);
    canvas.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      canvas.removeEventListener("click", handleMouseClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [
    setTiles,
    handleTileSelection,
    setSelectionType,
    plants,
    selectedSpecie,
    setIsSelectedTileOccupied,
    handlePlantSpecie,
  ]);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
    </>
  );
}
