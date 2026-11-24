import { useState, type Dispatch, type SetStateAction } from "react";
import type {
  BattlePhase,
  Fighter,
  GameState,
  PlayerBattleAbilities,
  PlayerStats,
} from "../../App";
import { findEnemy } from "./battle.logic";
import type { Viewport } from "../../rendering/viewport/viewport.type";
import type { GameAssets } from "../../assets/assetTypes";
import BattleScreenBottomTextBox from "./BattleScreenBottomTextBox/BattleScreenBottomTextBox";
import PlayerInfoBox from "./PlayerInfoBox/PlayerInfoBox";

export interface BattleScreenProps {
  playerStats: PlayerStats;
  playerBattleAbilities: PlayerBattleAbilities;
  HUDContainerSize: Viewport | null;
  assets: GameAssets;
  battlePhase: BattlePhase;
  handleHUDContainerSize: (value: Viewport) => void;
  setBattlePhase: Dispatch<SetStateAction<BattlePhase>>;
  setGameState: Dispatch<SetStateAction<GameState>>;
}

export type BattleOptions = "Attaquer" | "Capacités" | "Objets" | "Fuir" | null;

export default function BattleScreen({
  playerStats,
  playerBattleAbilities,
  assets,
  battlePhase,
  setBattlePhase,
  setGameState,
}: BattleScreenProps) {
  const playerFighter: Fighter = {
    healthPoint: playerStats.healthPoint,
    maxHealthPoint: playerStats.maxHealthpoint,
    id: "player",
    name: "Unité D'Exploration E-416",
  };

  const [selectedOption, setSelectedOption] = useState<BattleOptions>(null);
  const enemy = findEnemy("hommenivore");

  const enemyFighter: Fighter = {
    healthPoint: enemy.healthPoint,
    maxHealthPoint: enemy.maxHealthPoint,
    id: enemy.id,
    name: enemy.name,
  };

  return (
    <>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxHeight: "100vh",

          background: "transparent",
          backgroundImage: `url(${assets.battleScene_firstMap.src})`,
          backgroundSize: "cover",
        }}
      >
        {/* Enemy */}
        <PlayerInfoBox
          asset={assets.first_enemy_fightStatic}
          fighter={enemyFighter}
          alignement={"right"}
        />
        {/* Player */}
        <PlayerInfoBox
          asset={assets.playable_char_Fightstatic}
          fighter={playerFighter}
          alignement={"left"}
        />
      </div>

      <BattleScreenBottomTextBox
        playerBattleAbilities={playerBattleAbilities}
        selectedOption={selectedOption}
        enemy={enemy}
        player={playerFighter}
        battlePhase={battlePhase}
        setBattlePhase={setBattlePhase}
        setSelectedOption={setSelectedOption}
        setGameState={setGameState}
      />
    </>
  );
}
