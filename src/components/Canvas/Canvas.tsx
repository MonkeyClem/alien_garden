import { useEffect, useRef } from "react";
import styles from "./canvas.module.css";
import findTile from "../../game/rendering/tiles/findTile";
import drawAllTiles from "../../game/rendering/tiles/drawAllTiles";
import drawBackground from "../../game/rendering/background/drawBackground";
import {
  initialDecorations,
  type AssetsKey,
  type GameAssets,
  type Plant,
  type Tile,
} from "../../game/type";
import { HALF_TILE_HEIGHT } from "../../game/rendering/tiles/drawScreenGrid";
import { getPlantStage } from "./utils";
import { getDecorationOnTile } from '../../game/grid/getOccupiedTiles';

interface Canvas {
  handleSideMenuOpen: () => void;
  handleTileSelection: (tile: Tile) => void;
  setTiles: (value: Tile[] | ((prev: Tile[]) => Tile[])) => void;
  tiles: Tile[];
  assets: GameAssets;
  plants: Plant[];
}

const drawDecoration = (
  ctx: CanvasRenderingContext2D,
  tilePositions: Tile[],
  assets: GameAssets,
) => {
  initialDecorations.forEach((decoration) => {
    const tile = tilePositions.find((tile) => tile.id === decoration.tileId);

    if (!tile) return;

    const image = assets[decoration.assetKey];

    const x = tile.x - decoration.width / 2 + decoration.offsetX;

    const y =
      tile.y - decoration.height / 2 + HALF_TILE_HEIGHT + decoration.offsetY;

    ctx.drawImage(image, x, y, decoration.width, decoration.height);
  });
};

// const drawPlant = (ctx : CanvasRenderingContext2D, plant : Plant, tile : Tile ) => {

// }

const getPlantAssetKey = (plant: Plant, stage: number): AssetsKey => {
  if (plant.species === "reactorMushroom") {
    if (stage === 1) {
      return "reactorMushroomStageOne";
    }
    if (stage === 2) {
      return "reactorMushroomStageTwo";
    }
    return "reactorMushroomStageThree";
  }

  throw new Error(
    `No assets key available for species ${plant.species} au stade ${plant.stage}`,
  );
};


const drawPlants = (
  ctx: CanvasRenderingContext2D,
  plants: Plant[],
  tiles: Tile[],
  assets: GameAssets,
) => {
  plants.forEach((plant) => {
    const tile = tiles.find((tile) => tile.id === plant.tileId);
    if (!tile) return;

    const stage = getPlantStage(plant);

    const assetKey = getPlantAssetKey(plant, stage);

    const image = assets[assetKey];

    ctx.drawImage(
      image,
      tile?.x - 75 / 2,
      tile?.y - HALF_TILE_HEIGHT - 75 / 2,
      75,
      75,
    );
  });
};

export default function Canvas({
  handleTileSelection,
  setTiles,
  tiles,
  plants,
  assets,
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






  // useEffect(() => {
  //   if (!canvasRef.current) return;
  //   const canvas = canvasRef.current;

  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;

  //   const ctx = canvas.getContext("2d");

  //   if (!ctx) {
  //     console.log("Your browser does not support 2D canvas rendering.");
  //     return;
  //   }

  //   const render = () => {
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     drawBackground(ctx, canvas);
  //     drawAllTiles(tiles, ctx);
  //     drawDecoration(ctx, tiles, assets);
  //     drawPlants(ctx, plants, tiles, assets);
  //   };

  //   render();

  //   const handleMouseClick = (event: MouseEvent) => {
  //     const clickedPositions = { x: event.clientX, y: event.clientY };
  //     const selectedTileId = findTile(tiles, clickedPositions, ctx);

  //     if (!selectedTileId) return;

  //     setTiles((currentTiles: Tile[]) =>
  //       currentTiles.map((tile: Tile) => ({
  //         ...tile,
  //         selected: tile.id === selectedTileId,
  //       })),
  //     );

  //     const selectedTile = tiles.find((e) => selectedTileId === e.id);

  //     if (!selectedTile) return;

  //     handleTileSelection({
  //       ...selectedTile,
  //       selected: true,
  //     });

  //     render();
  //   };

  //   const handleMouseMove = (event: MouseEvent) => {
  //     const hoveredPos = { x: event.clientX, y: event.clientY };
  //     const hoveredTileId = findTile(tiles, hoveredPos, ctx);

  //     if (!hoveredTileId || hoveredTileId === undefined) return;

  //     const hoveredTile = tiles.find((tile) => tile.id === hoveredTileId);

  //     if (!hoveredTile) return;

  //     tiles.forEach((tile) => (tile.hovered = false));
  //     setTiles(tiles);

  //     hoveredTile.hovered = true;

  //     render();
  //   };

  //   canvas.addEventListener("click", handleMouseClick);
  //   canvas.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     canvas.removeEventListener("click", handleMouseClick);
  //     canvas.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, [tiles, plants, assets]);



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
    drawAllTiles(tilesRef.current, ctx);
    drawDecoration(ctx, tilesRef.current, assetsRef.current);
    drawPlants(
      ctx,
      plantsRef.current,
      tilesRef.current,
      assetsRef.current
    );

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

    const selectedTileId = findTile(
      tilesRef.current,
      clickedPosition,
      ctx
    );

    if (!selectedTileId) return;
    

    setTiles((currentTiles) =>
      currentTiles.map((tile) => ({
        ...tile,
        selected: tile.id === selectedTileId,
      }))
    );

    const selectedTile : Tile | undefined = tilesRef.current.find(
      (tile) => tile.id === selectedTileId
    );

    if (!selectedTile) return;

//     const clickedDecoration = findDecorationAtPosition(
//   clickedPosition,
//   initialDecorations,
//   tilesRef.current
// );

// if (clickedDecoration) {
//   console.log("Décoration cliquée :", clickedDecoration);
//   return;
// }

    const decoration = initialDecorations.find((deco) => deco.tileId === selectedTileId)
    let clickedDecorationOccupiedTiles : number[]
    if(decoration){
     clickedDecorationOccupiedTiles = getDecorationOnTile(selectedTile, decoration.footPrint)
    }

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

    const hoveredTileId = findTile(
      tilesRef.current,
      hoveredPosition,
      ctx
    );

    setTiles((currentTiles) =>
      currentTiles.map((tile) => ({
        ...tile,
        hovered: tile.id === hoveredTileId,
      }))
    );
  };

  canvas.addEventListener("click", handleMouseClick);
  canvas.addEventListener("mousemove", handleMouseMove);

  return () => {
    canvas.removeEventListener("click", handleMouseClick);
    canvas.removeEventListener("mousemove", handleMouseMove);
  };
}, [setTiles, handleTileSelection]);


  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
    </>
  );
}
