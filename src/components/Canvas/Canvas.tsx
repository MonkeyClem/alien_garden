import { useEffect, useRef, type SetStateAction } from "react";
import styles from "./canvas.module.css";
import findTile from "../../game/rendering/tiles/findTile";
import drawAllTiles from "../../game/rendering/tiles/drawAllTiles";
import drawBackground from "../../game/rendering/background/drawBackground";
import {
  initialDecorations,
  type AssetsKey,
  type GameAssets,
  type Plant,
  type selectionType,
  type Tile,
} from "../../game/type";
import { HALF_TILE_HEIGHT } from "../../game/rendering/tiles/drawScreenGrid";
import { getPlantStage } from "./utils";
import { findDecorationOnTile } from "../../game/grid/getOccupiedTiles";

interface Canvas {
  handleSideMenuOpen: () => void;
  handleTileSelection: (tile: Tile) => void;
  setTiles: (value: Tile[] | ((prev: Tile[]) => Tile[])) => void;
  setSelectionType : React.Dispatch<SetStateAction<selectionType>>,
  setIsSelectedTileOccupied: (value : boolean) => void
  tiles: Tile[];
  selectionType: selectionType;
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


    const findPlantOnTile = (
      selectedTileId : number,
      plants : Plant[]
    ) => {

      const foundPlant = plants.find((plant) => plant.tileId === selectedTileId)

      if(foundPlant){ 
        return true
      }else{return false}

    }

export default function Canvas({
  handleTileSelection,
  setTiles,
  setSelectionType,
  setIsSelectedTileOccupied,
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
      drawPlants(ctx, plantsRef.current, tilesRef.current, assetsRef.current);

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

      const clickedPlant = findPlantOnTile(selectedTileId, plantsRef.current)


      if (clickedDecoration) {
        console.log("Décoration sélectionnée :", clickedDecoration);
        setSelectionType("decoration")
        setIsSelectedTileOccupied(true)
      }

      if(clickedPlant){
        setSelectionType("plant")
        setIsSelectedTileOccupied(true)
      }

      if(!clickedDecoration && !clickedPlant){
        setSelectionType("empty")
        setIsSelectedTileOccupied(false)
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
