import { useState, type Dispatch, type SetStateAction } from "react";
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

export interface BattleScreenProps {
  playerStats: PlayerStats;
  playerBattleAbilities: PlayerBattleAbilities;
  HUDContainerSize: Viewport | null;
  assets: GameAssets;
  handleHUDContainerSize: (value: Viewport) => void;
  setGameState: Dispatch<SetStateAction<GameState>>;
}

export type BattleOptions = "Attaquer" | "Capacités" | "Objets" | "Fuir" | null;

export default function BattleScreen({
  playerStats,
  playerBattleAbilities,
  assets,
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

  if (!battle) return;

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
          fighter={battle.enemy}
          alignement={"right"}
        />
        {/* Player */}
        <PlayerInfoBox
          asset={assets.playable_char_Fightstatic}
          fighter={battle.player}
          alignement={"left"}
        />
      </div>

      <BattleScreenBottomTextBox
        playerBattleAbilities={playerBattleAbilities}
        selectedOption={selectedOption}
        battle={battle}
        setBattle={setBattle}
        setSelectedOption={setSelectedOption}
        setGameState={setGameState}
      />
    </>
  );
}
