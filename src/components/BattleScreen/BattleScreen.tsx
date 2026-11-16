import { useState } from "react";
import type { Fighter, PlayerBattleAbilities, PlayerStats } from "../../App";
import { findEnemy } from "./battle.logic";
import styles from "../BattleScreen/battleScreen.module.css";
import type { Viewport } from "../../rendering/viewport/viewport.type";
import { getViewport } from "../../rendering/viewport/getViewport";
import type { GameAssets } from "../../assets/assetTypes";

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
    <div
      //   className={styles.battleScreenContainer}
      style={{
        overflow: "hidden",
        //Ajouter une image illustrant la map en background
        //   background: "green",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        background: "transparent",
        backgroundImage: `url(${assets.battleScene_firstMap.src})`,
        backgroundSize: "cover",
        borderLeft: HUDContainerSize?.offsetX ? HUDContainerSize.offsetX + 5 : 25,
        borderRight: HUDContainerSize?.offsetX ? HUDContainerSize.offsetX + 5 : 25,

        top: HUDContainerSize?.offsetY ? HUDContainerSize.offsetY : 10,
        bottom: HUDContainerSize?.offsetY ? HUDContainerSize.offsetY : 0,
      }}
    >
      <div
        //BG devra être transparent
        style={{
          background: "transparent",
          flex: 1,
          height: "50%",
          width: "100%",
          right: 0,
          justifySelf: "right",
          position: "relative",
        }}
        //   className={styles.enemyInfoContainer}
      >
        <div
          style={{
            position: "absolute",
            background: "black",
            marginRight: "2.5%",
            width: "30%",
            marginTop: "2%",
            right: 25,
          }}
        >
          {" "}
          <p>{enemy.name}</p>
          <p>
            {" "}
            {enemy.healthPoint} / {enemy.maxHealthPoint}
          </p>
        </div>
      </div>
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
        <div
          style={{
            position: "absolute",
            background: "black",
            marginRight: "2.5%",
            width: "30%",
            marginTop: "2%",
            left: 25,
            top: 125,
          }}
        >
          <p>{playerFighter.name}</p>
          <p>
            {playerFighter.healthPoint} / {playerFighter.maxHealthPoint}
          </p>
        </div>

        <div
          //   className={styles.battleScreenBottomTextBox}
          style={{
            background: "#000",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            margin: "0 auto",
            width: "95%",
            minHeight: 120,
            borderRadius: 10,
            display: "flex",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          <p>This is the text box</p>
          <div
            style={{
              background: "purple",
              justifySelf: "right",
              width: "30%",
              minHeight: 120,
            }}
          >
            {selectedOption === null && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <button onClick={() => setSelectedOption("Attaquer")}>Attaquer</button>
                <button onClick={() => setSelectedOption("Capacités")}>Capacités</button>
                <button onClick={() => setSelectedOption("Objets")}>Objets</button>
                <button onClick={() => setSelectedOption("Fuir")}>Fuir</button>
                {/* <div>
                  <p>{playerBattleAbilities.eletricDischarge.name}</p>
                </div>
                <div>
                  <p>{playerBattleAbilities.stomping.name}</p>
                </div> */}
              </div>
            )}

            {selectedOption === "Attaquer" && (
              <>
                <div>
                  <button>{playerBattleAbilities.eletricDischarge.name}</button>
                </div>
                <div>
                  <button>{playerBattleAbilities.stomping.name}</button>
                </div>
                <div>
                  <button onClick={() => setSelectedOption(null)}>Retour</button>
                </div>
              </>
            )}

            {selectedOption === "Capacités" && (
              <>
                Aucune capacités pour le moment
                <div>
                  <button onClick={() => setSelectedOption(null)}>Retour</button>
                </div>
              </>
            )}

            {selectedOption === "Objets" && (
              <>
                Aucun objets pour le moment
                <div>
                  <button onClick={() => setSelectedOption(null)}>Retour</button>
                </div>
              </>
            )}

            {selectedOption === "Fuir" && (
              <>
                INTRODUIRE LOGIQUE DE TENTATIVE DE FUITE
                <div>
                  <button onClick={() => setSelectedOption(null)}>Retour</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
