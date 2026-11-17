import { useState, type JSX } from "react";
import type { Fighter, PlayerBattleAbilities, PlayerStats } from "../../App";
import { findEnemy } from "./battle.logic";
import type { Viewport } from "../../rendering/viewport/viewport.type";
import { getViewport } from "../../rendering/viewport/getViewport";
import type { GameAssets } from "../../assets/assetTypes";
import BattleScreenBottomTextBox from "./BattleScreenBottomTextBox/BattleScreenBottomTextBox";

export interface BattleScreenProps {
  playerStats: PlayerStats;
  playerBattleAbilities: PlayerBattleAbilities;
  HUDContainerSize: Viewport | null;
  assets: GameAssets;
  handleHUDContainerSize: (value: Viewport) => void;
}

export type BattleOptions = "Attaquer" | "Capacités" | "Objets" | "Fuir" | null;

interface HealthBarProps {
  healthPoint: number;
  maxHealthPoint: number;
}

const HealthBar: React.FC<HealthBarProps> = ({
  healthPoint,
  maxHealthPoint,
}): JSX.Element => {
  const referenceMaxHP = healthPoint;
  const barWidth = Math.min((maxHealthPoint / referenceMaxHP) * 100, 100);

  const healthPercentage = Math.max(
    0,
    Math.min(maxHealthPoint / referenceMaxHP) * 100,
    100,
  );

  return (
    <div
      style={{
        height: 15,
        border: "2px solid pink",
        width: `${barWidth}%`,
        display: "flex",
      }}
    >
      <div
        style={{
          height: 15,
          width: `${healthPercentage}%`,
          background: "red",
        }}
      />
    </div>
  );
};

export default function BattleScreen({
  playerStats,
  playerBattleAbilities,
  HUDContainerSize,
  assets,
  handleHUDContainerSize,
}: BattleScreenProps) {
  const playerFighter: Fighter = {
    healthPoint: playerStats.healthPoint,
    maxHealthPoint: playerStats.maxHealthpoint,
    id: "player",
    name: "Unité D'Exploration E-416",
  };

  const [selectedOption, setSelectedOption] = useState<BattleOptions>(null);
  const enemy = findEnemy("nebroide");
  const viewport = getViewport(window.screen.width, window.screen.height);
  handleHUDContainerSize(viewport);

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

          borderLeft: HUDContainerSize?.offsetX ? HUDContainerSize.offsetX + 5 : 25,
          borderRight: HUDContainerSize?.offsetX ? HUDContainerSize.offsetX + 5 : 25,

          top: HUDContainerSize?.offsetY ? HUDContainerSize.offsetY : 10,
          bottom: HUDContainerSize?.offsetY ? HUDContainerSize.offsetY : 0,

          overflow: "hidden",
        }}
      >
        {/* A transformer en composant FightParticipantInfoContainer ou autre */}
        <div
          style={{
            background: "transparent",
            flex: 1,
            height: "50%",
            width: "100%",
            position: "relative",
          }}
        >
          <img
            src={assets.first_enemy_fightStatic.src}
            alt="Humanivore"
            style={{
              position: "absolute",
              width: "25%",
              height: "auto",
              right: "15%",
              top: "35%",
              objectFit: "contain",
            }}
          />

          <div
            id="enemyHealthPointBar"
            style={{
              position: "absolute",
              background: "black",
              marginRight: "2.5%",
              width: "30%",
              marginTop: "2%",
              left: 25,
              padding: "1rem",
              boxSizing: "border-box",
            }}
          >
            <p>{enemy.name}</p>
            <p>
              {enemy.healthPoint} / {enemy.maxHealthPoint}
            </p>
            <HealthBar
              healthPoint={enemy.healthPoint}
              maxHealthPoint={enemy.maxHealthPoint}
            />
          </div>
        </div>
        {/* A transformer en composant FightParticipantInfoContainer ou autre */}
        <div
          //   className={styles.playerInfoContainer}
          //BG devra être transparent
          style={{
            background: "transparent",
            flex: 1,
            position: "relative",
            height: "50%",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img
            src={assets.playable_char_Fightstatic.src}
            alt="Humanivore"
            style={{
              position: "absolute",
              width: "25%",
              height: "auto",
              left: "15%",
              bottom: "25%",
              objectFit: "contain",
            }}
          />
          <div
            style={{
              position: "absolute",
              background: "black",
              marginRight: "2.5%",
              width: "30%",
              marginTop: "2%",
              right: 0,
              top: 125,
              padding: "1rem",
              boxSizing: "border-box",
            }}
          >
            <p>{playerFighter.name}</p>
            <p>
              {playerFighter.healthPoint} / {playerFighter.maxHealthPoint}
            </p>
            <p>
              <HealthBar
                healthPoint={enemy.healthPoint}
                maxHealthPoint={enemy.maxHealthPoint}
              />{" "}
            </p>
          </div>
        </div>
      </div>

      <BattleScreenBottomTextBox
        playerBattleAbilities={playerBattleAbilities}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </>
  );
}
