import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  type BattleState,
  type Fighter,
  type GameState,
  type PlayerBattleAbilities,
  type PlayerStats,
} from "../../App";
import { findEnemy, launchBattle } from "./battle.logic";
import type { Viewport } from "../../rendering/viewport/viewport.type";
import type { GameAssets } from "../../assets/assetTypes";
import PlayerInfoBox from "./PlayerInfoBox/PlayerInfoBox";
import BattleScreenBottomTextBox from "./BattleScreenBottomTextBox/BattleScreenBottomTextBox";
import { WORLD_WIDTH, WORLD_HEIGHT } from "../../game/world/world.constant";
import { getViewport } from "../../rendering/viewport/getViewport";
import BattleEffectCanvas from "./effects/BattleEffectCanvas";

export interface BattleScreenProps {
  playerStats: PlayerStats;
  playerBattleAbilities: PlayerBattleAbilities;
  HUDContainerSize: Viewport | null;
  assets: GameAssets;
  handleHUDContainerSize: (value: Viewport) => void;
  setGameState: Dispatch<SetStateAction<GameState>>;
}

export type BattleOptions = "Attaquer" | "Capacités" | "Objets" | "Fuir" | null;

export type BattlePosition = {
  x: number;
  y: number;
};

export type FighterAnchors = {
  attackOrigin: BattlePosition;
  hitTarget: BattlePosition;
};

export default function BattleScreen({
  playerStats,
  playerBattleAbilities,
  assets,
  HUDContainerSize,
  handleHUDContainerSize,
  setGameState,
}: BattleScreenProps) {
  const [selectedOption, setSelectedOption] = useState<BattleOptions>(null);

  const playerFighter: Fighter = {
    healthPoint: playerStats.healthPoint,
    maxHealthPoint: playerStats.maxHealthpoint,
    id: "player",
    name: "Unité D'Exploration E-416",
  };

  const enemy = findEnemy("hommenivore");

  const enemyFighter: Fighter = {
    healthPoint: enemy.healthPoint,
    maxHealthPoint: enemy.maxHealthPoint,
    id: enemy.id,
    name: enemy.name,
  };

  const [battle, setBattle] = useState<BattleState | null>(() =>
    launchBattle(playerFighter, enemyFighter),
  );

  useEffect(() => {
    const handleResize = () => {
      handleHUDContainerSize(getViewport(window.innerWidth, window.innerHeight));
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleHUDContainerSize]);

  const playerAttackOriginPosition: BattlePosition = { x: 575, y: 600 };

  if (!battle || !HUDContainerSize) return;

  return (
    <>
      <div
        style={{
          position: "absolute",

          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,

          left: HUDContainerSize.offsetX,
          top: HUDContainerSize.offsetY,

          transform: `scale(${HUDContainerSize.scale})`,
          transformOrigin: "top left",

          backgroundImage: `url(${assets.battleScene_firstMap.src})`,
          backgroundSize: "cover",

          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        {/* Enemy */}
        <PlayerInfoBox
          asset={assets.first_enemy_fightStatic}
          fighter={battle.enemy}
          alignement={"right"}
        />
        {/* Player */}
        <PlayerInfoBox
          asset={assets.playable_char_Fightstatic}
          fighter={battle.player}
          alignement={"left"}
        />
        <BattleScreenBottomTextBox
          playerBattleAbilities={playerBattleAbilities}
          selectedOption={selectedOption}
          battle={battle}
          setBattle={setBattle}
          setSelectedOption={setSelectedOption}
          setGameState={setGameState}
        />

        <BattleEffectCanvas position={playerAttackOriginPosition} />
      </div>
    </>
  );
}
