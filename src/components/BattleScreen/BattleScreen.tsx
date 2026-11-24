import { useState } from "react";
import type { Fighter, PlayerBattleAbilities, PlayerStats } from "../../App";
import { findEnemy } from "./battle.logic";
import type { Viewport } from "../../rendering/viewport/viewport.type";
import { getViewport } from "../../rendering/viewport/getViewport";
import type { GameAssets } from "../../assets/assetTypes";
import BattleScreenBottomTextBox from "./BattleScreenBottomTextBox/BattleScreenBottomTextBox";
import PlayerInfoBox from "./PlayerInfoBox/PlayerInfoBox";

export interface BattleScreenProps {
  playerStats: PlayerStats;
  playerBattleAbilities: PlayerBattleAbilities;
  HUDContainerSize: Viewport | null;
  assets: GameAssets;
  handleHUDContainerSize: (value: Viewport) => void;
}

export type BattleOptions = "Attaquer" | "Capacités" | "Objets" | "Fuir" | null;

export default function BattleScreen({
  playerStats,
  playerBattleAbilities,
  assets,
}: BattleScreenProps) {
  const playerFighter: Fighter = {
    healthPoint: playerStats.healthPoint,
    maxHealthPoint: playerStats.maxHealthpoint,
    id: "player",
    name: "Unité D'Exploration E-416",
  };

  const [selectedOption, setSelectedOption] = useState<BattleOptions>(null);
  const enemy = findEnemy("hommenivore");

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
        {/* A transformer en composant FightParticipantInfoContainer ou autre */}

        <PlayerInfoBox
          asset={assets.first_enemy_fightStatic}
          fighter={enemy}
          alignement={"right"}
        />
        {/* A transformer en composant FightParticipantInfoContainer ou autre */}
        <PlayerInfoBox
          asset={assets.playable_char_Fightstatic}
          fighter={playerFighter}
          alignement={"left"}
        />
      </div>

      <BattleScreenBottomTextBox
        playerBattleAbilities={playerBattleAbilities}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </>
  );
}
