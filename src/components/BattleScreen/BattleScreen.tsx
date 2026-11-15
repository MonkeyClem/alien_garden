import { useState } from "react";
import type { Fighter, PlayerBattleAbilities, PlayerStats } from "../../App";
import { findEnemy } from "./battle.logic";

export interface BattleScreenProps {
  playerStats: PlayerStats;
  playerBattleAbilities: PlayerBattleAbilities;
}

export type BattleOptions = "Attaquer" | "Capacités" | "Objets" | "Fuir" | null;

export default function BattleScreen({
  playerStats,
  playerBattleAbilities,
}: BattleScreenProps) {
  const playerFighter: Fighter = {
    healthPoint: playerStats.healthPoint,
    maxHealthPoint: playerStats.maxHealthpoint,
    id: "player",
    name: "Unité D'Exploration E-416",
  };

  const [selectedOption, setSelectedOption] = useState<BattleOptions>(null);

  const enemy = findEnemy("nebroide");

  return (
    <>
      <div
        //   className={styles.battleScreenContainer}
        style={{
          //Ajouter une image illustrant la map en background
          background: "green",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          //BG devra être transparent
          style={{
            background: "red",
            flex: 1,
            height: "50%",
            width: "30%",
            right: 0,
            justifySelf: "right",
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
            background: "blue",
            flex: 1,
            height: "50%",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              background: "#000",
              justifySelf: "left",
              width: "30%",
              height: "10%",
              marginTop: "12%",
              marginLeft: "2.5%",
            }}
          >
            <p>{playerFighter.name}</p>
            {playerFighter.healthPoint} / {playerFighter.maxHealthPoint}
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
            }}
          >
            <div
              style={{
                background: "purple",
                justifySelf: "right",
                width: "30%",
              }}
            >
              {selectedOption === null && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <button onClick={() => setSelectedOption("Attaquer")}>Attaquer</button>
                  <button onClick={() => setSelectedOption("Capacités")}>
                    Capacités
                  </button>
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
            This is the text box
          </div>
        </div>
      </div>
    </>
  );
}
