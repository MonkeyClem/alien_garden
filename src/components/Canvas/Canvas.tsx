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
import { getOccupiedTileIds } from "../../game/decorations/getOccupiedTilesIds";
import {
  GRID_ORIGIN_X,
  GRID_ORIGIN_Y,
  HALF_TILE_HEIGHT,
  HALF_TILE_WIDTH,
} from "../../game/grid/grid.constants";

export type PlayerDirections = "left" | "right" | "top" | "bottom";

export interface Player {
  gridX: number;
  gridY: number;
  targetGridX: number;
  targetGridY: number;
  speed: number;

  animationFrame: number;
  animationElapsed: number;
  animationState: "static" | "walking";

  isMoving: boolean;
  direction: PlayerDirections;

  playerPath: Tile[];
}

export interface PathNode {
  tileOnPath: Tile;
  costOfPath: number;
  heuristic: number;
  totalCost: number;
  reachedFromNode: PathNode | null;
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

    if (player.playerPath.length === 0) return;
    player.animationElapsed += deltaTime;

    while (player.animationElapsed >= frameDuration) {
      player.animationFrame = (player.animationFrame + 1) % 4;
      player.animationElapsed -= frameDuration;
    }
  };

  const getPlayerDirection = (player: Player): PlayerDirections => {
    if (player.targetGridX > player.gridX) {
      return "right";
    }
    if (player.targetGridX < player.gridX) {
      return "left";
    }
    if (player.targetGridY > player.gridY) {
      return "bottom";
    }
    if (player.targetGridY < player.gridY) {
      return "top";
    } else return player.direction;
  };

  const getPlayerSprite = (player: Player, assets: GameAssets): HTMLImageElement => {
    if (player.animationState === "static") return assets.playable_char_static;
    switch (player.direction) {
      case "bottom":
        return assets.walking_character;
      case "top":
        return assets.walking_character;
      case "left":
        return assets.walking_character;
      case "right":
        return assets.walking_character;
      default:
        return assets.playable_char_static;
    }
  };

  const updatePlayerPosition = (player: Player, deltaTime: number) => {
    if (player.playerPath.length === 0) {
      player.animationState = "static";

      return;
    } else {
      player.animationState = "walking";
    }

    const nextTile = player.playerPath[0];

    player.targetGridX = nextTile.gridX;
    player.targetGridY = nextTile.gridY;

    const playerDirection = getPlayerDirection(player);
    player.direction = playerDirection;

    const distanceLeftX = player.targetGridX - player.gridX;
    const distanceLeftY = player.targetGridY - player.gridY;

    const distanceLeft = Math.hypot(distanceLeftX, distanceLeftY);
    const maxDistance = player.speed * deltaTime;

    if (distanceLeft <= maxDistance) {
      player.gridX = player.targetGridX;
      player.gridY = player.targetGridY;

      player.playerPath.shift();

      return;
    }
    const directionX = distanceLeftX / distanceLeft;
    const directionY = distanceLeftY / distanceLeft;

    player.gridX += directionX * maxDistance;
    player.gridY += directionY * maxDistance;
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

    if (player.current.playerPath.length === 0) {
      player.current.animationState = "static";
    } else {
      player.current.animationState = "walking";
    }

    const image = getPlayerSprite(player.current, assets);

    const frameWidth = image.width / 4;
    const frameHeight = image.height;

    const frameIndex = player.current.animationFrame;

    const sourceX = frameIndex * frameWidth;
    const sourceY = 0;

    if (player.current.animationState === "static") {
      ctx.drawImage(image, x, y + 5, width, height);
      return;
    }

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
  };

  const occupiedTileIds = new Set(
    initialDecorations.flatMap(decoration => getOccupiedTileIds(decoration)),
  );

  const getWalkableNeighbors = (
    gridX: number,
    gridY: number,
    tiles: Tile[],
    occupiedTileIds: Set<number>,
  ): Tile[] => {
    const directions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];

    const walkableNeighbors: Tile[] = [];

    directions.forEach(direction => {
      const neighborX = gridX + direction.dx;
      const neighborY = gridY + direction.dy;

      const neighbor = tiles.find(
        tile => tile.gridX === neighborX && tile.gridY === neighborY,
      );

      if (!neighbor) return;

      if (occupiedTileIds.has(neighbor.id)) return;

      walkableNeighbors.push(neighbor);
    });

    return walkableNeighbors;
  };

  //DISTANCE DE MANHATTAN
  const getHeuristic = (
    destinationGridX: number,
    destinationGridY: number,
    originGridX: number,
    originGridY: number,
  ) => {
    const estimatedCostX = Math.abs(destinationGridX - originGridX);
    const estimatedCostY = Math.abs(destinationGridY - originGridY);

    const estimatedTotalCost = estimatedCostX + estimatedCostY;
    return estimatedTotalCost;
  };

  const getParentNode = (finalNode: PathNode, startTile: Tile): Tile[] => {
    let parentTile: PathNode = finalNode;
    const wayToFirstNodeNotReversed: Tile[] = [];

    if (finalNode.tileOnPath.id === startTile.id || parentTile.reachedFromNode === null) {
      return wayToFirstNodeNotReversed;
    }

    //On ajoutera le originNode à l'indice 0 après le while

    while (parentTile.reachedFromNode !== null) {
      wayToFirstNodeNotReversed.push(parentTile.tileOnPath);
      parentTile = parentTile.reachedFromNode;
    }
    wayToFirstNodeNotReversed.push(startTile);

    return wayToFirstNodeNotReversed.reverse();
  };

  const findPlayerPath = (
    startTile: Tile,
    destinationTile: Tile,
    tiles: Tile[],
    occupiedTileIds: Set<number>,
  ): Tile[] => {
    const firstPathNodeHeuristic = getHeuristic(
      destinationTile.gridX,
      destinationTile.gridY,
      startTile.gridX,
      startTile.gridY,
    );

    const firstPathode: PathNode = {
      costOfPath: 0,
      heuristic: firstPathNodeHeuristic,
      reachedFromNode: null,
      tileOnPath: startTile,
      totalCost: firstPathNodeHeuristic, //Similaire à l'heuristique pour le premier, car g (le cout total du chemin) est automatiquement à 0
    };

    const openSet: Set<PathNode> = new Set();
    const closedSet: Set<PathNode> = new Set();

    openSet.add(firstPathode);

    let nodeToReturn: PathNode | null = null;

    while (openSet.size > 0) {
      let actualCheaperCostNode: PathNode | null = null;

      for (const node of openSet) {
        // Trouver le nœud avec le plus petit f
        if (
          actualCheaperCostNode === null ||
          node.totalCost < actualCheaperCostNode.totalCost
        ) {
          actualCheaperCostNode = node;
        }
      }

      if (
        actualCheaperCostNode !== null &&
        actualCheaperCostNode.tileOnPath.id === destinationTile.id
      ) {
        nodeToReturn = actualCheaperCostNode;
        break;
      }

      // Examiner le nœud sélectionné
      if (actualCheaperCostNode !== null) {
        // Explorer ses voisins
        const walkableNeighbors = getWalkableNeighbors(
          actualCheaperCostNode.tileOnPath.gridX,
          actualCheaperCostNode.tileOnPath.gridY,
          tiles,
          occupiedTileIds,
        );

        // Pour chaque neighborTile, tu dois :
        for (const neighborTile of walkableNeighbors) {
          // 1. Calculer son nouveau coût g depuis actualCheaperCostNode.
          const updatedCostOfPath = actualCheaperCostNode.costOfPath + 1;
          const newNodeHeuristic = getHeuristic(
            neighborTile.gridX,
            neighborTile.gridY,
            destinationTile.gridX,
            destinationTile.gridY,
          );
          const newNode: PathNode = {
            costOfPath: updatedCostOfPath,
            heuristic: newNodeHeuristic,
            reachedFromNode: actualCheaperCostNode,
            tileOnPath: neighborTile,
            totalCost: newNodeHeuristic + updatedCostOfPath,
          };

          // 2. Vérifier si cette tuile correspond à un nœud déjà présent dans le closedSet.
          // Si c'est le cas, on ignore
          const isAlreadyClosed = [...closedSet].some(
            newNode => newNode.tileOnPath.id === neighborTile.id,
          );

          const existingOpenNode = [...openSet].find(
            node => node.tileOnPath.id === neighborTile.id,
          );

          if (isAlreadyClosed) continue;

          if (existingOpenNode === undefined) {
            // Le voisin n'a jamais été découvert
            // Ajouter newNode à openSet
            openSet.add(newNode);
          } else {
            // Le voisin possède déjà un PathNode
            // Comparer son g avec updatedCostOfPath
            if (existingOpenNode.costOfPath > updatedCostOfPath) {
              openSet.delete(existingOpenNode);
              openSet.add(newNode);
            }
          }
        }
      }

      // Mettre à jour les ensembles
      if (actualCheaperCostNode !== null) {
        openSet.delete(actualCheaperCostNode);
        closedSet.add(actualCheaperCostNode);
      }

      if (!actualCheaperCostNode) return [firstPathode.tileOnPath];
    }
    if (nodeToReturn !== null) return getParentNode(nodeToReturn, startTile);
    return [firstPathode.tileOnPath];
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
