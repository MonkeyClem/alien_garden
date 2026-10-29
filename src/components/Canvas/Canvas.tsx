import { useEffect, useRef, type RefObject } from "react";
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
import {
  GRID_ORIGIN_X,
  GRID_ORIGIN_Y,
  HALF_TILE_HEIGHT,
  HALF_TILE_WIDTH,
} from "../../game/grid/grid.constants";

export interface Player {
  gridX: number;
  gridY: number;
  targetGridX: number;
  targetGridY: number;
  speed: number;

  animationFrame: number;
  animationElapsed: number;

  isMoving: boolean;
}

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
  const updatePlayerAnimation = (player: Player, deltaTime: number) => {
    const frameDuration = 1 / 6;

    player.animationElapsed += deltaTime;

    while (player.animationElapsed >= frameDuration) {
      player.animationFrame = (player.animationFrame + 1) % 4;
      player.animationElapsed -= frameDuration;
    }
  };

  const drawPlayer = (
    ctx: CanvasRenderingContext2D,
    assets: GameAssets,
    player: RefObject<Player>,
  ) => {
    const worldX =
      GRID_ORIGIN_X + (player.current.gridX - player.current.gridY) * HALF_TILE_WIDTH;

    const worldY =
      GRID_ORIGIN_Y + (player.current.gridX + player.current.gridY) * HALF_TILE_HEIGHT;

    const width = 56;
    const height = 72;

    const x = worldX - width / 2;
    const y = worldY - height;

    const isMoving: boolean =
      player.current.gridX != player.current.targetGridX ||
      player.current.gridY != player.current.targetGridY;

    let image: HTMLImageElement;

    if (isMoving) {
      player.current.isMoving = true;
      image = assets.walking_character;

      const frameWidth = image.width / 4;
      const frameHeight = image.height;

      const frameIndex = player.current.animationFrame;

      const sourceX = frameIndex * frameWidth;
      const sourceY = 0;

      ctx.drawImage(
        image,
        sourceX,
        sourceY,
        frameWidth,
        frameHeight,
        x,
        y + 5,
        width,
        height,
      );
    } else {
      player.current.isMoving = false;
      image = assets.playable_char_static;
      ctx.drawImage(image, x, y + 5, width, height);
    }

    // ctx.beginPath();
    // ctx.arc(worldX, worldY, 5, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.lineWidth = 4;
    // ctx.strokeStyle = "blue";
    // ctx.stroke();
  };

  const updatePlayerPosition = (player: Player, deltaTime: number) => {
    //  Calculer la différence entre la position actuelle et la destination (dx et dy).
    const playerActualPosX = player.gridX;
    const playerActualPosY = player.gridY;

    const destinationPosX = player.targetGridX;
    const destinationPosY = player.targetGridY;

    const distanceLeftX = destinationPosX - playerActualPosX;
    const distanceLeftY = destinationPosY - playerActualPosY;
    // Calculer la distance restante avec Math.hypot(dx, dy).

    const distanceLeft = Math.hypot(distanceLeftX, distanceLeftY);
    // Calculer la distance maximale parcourue pendant cette frame avec player.speed * deltaTime.
    const maxDistance = player.speed * deltaTime;
    // Si le personnage peut atteindre sa destination pendant cette frame, positionner exactement gridX et gridY sur la destination
    if (distanceLeft <= maxDistance) {
      player.gridX = player.targetGridX;
      player.gridY = player.targetGridY;
      return;
    }
    // Sinon, avancer dans la direction de la destination en normalisant le vecteur (dx, dy).
    const directionX = distanceLeftX / distanceLeft;
    const directionY = distanceLeftY / distanceLeft;

    player.gridX += directionX * maxDistance;
    player.gridY += directionY * maxDistance;

    // const worldX = GRID_ORIGIN_X + (player.targetGridX - player.gridY) * HALF_TILE_WIDTH;
    // const worldY = GRID_ORIGIN_Y + (player.targetGridX + player.gridY) * HALF_TILE_HEIGHT;
    // ctx.beginPath();
    // ctx.arc(worldX, worldY, 5, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.lineWidth = 4;
    // ctx.strokeStyle = "blue";
    // ctx.stroke();
  };

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

    isMoving: false,
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
      );
      drawPlayer(ctx, assets, playerRef);

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

      if (!clickedObject) {
        playerRef.current.targetGridX = selectedTile.gridX;
        playerRef.current.targetGridY = selectedTile.gridY;
        // updatePlayerPosition(ctx, assets, playerRef)
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
