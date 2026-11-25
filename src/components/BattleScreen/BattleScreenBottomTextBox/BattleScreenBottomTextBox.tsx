import type { BattleOptions } from "../BattleScreen";
import type {
  BattlePhase,
  BattleState,
  Fighter,
  GameState,
  PlayerBattleAbilities,
} from "../../../App";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { type EnemyConfig } from "../enemy/enemy.config";
import { playerRound } from "../battle.logic";

export interface BattleScreenBottomTextBoxProps {
  selectedOption: BattleOptions;
  playerBattleAbilities: PlayerBattleAbilities;
  player: Fighter;
  enemy: EnemyConfig;
  enemyFighter: Fighter;
  battlePhase: BattlePhase;
  battle: BattleState;
  setSelectedOption: Dispatch<SetStateAction<BattleOptions>>;
  setGameState: Dispatch<SetStateAction<GameState>>;
  setBattle: Dispatch<SetStateAction<BattleState>>;
}

export default function BattleScreenBottomTextBox({
  selectedOption,
  playerBattleAbilities,
  battle,
  battlePhase,
  setSelectedOption,
  setGameState,
  setBattle,
}: BattleScreenBottomTextBoxProps) {
  useEffect(() => {
    if (selectedOption === "Fuir") {
      setGameState("exploration");
    }
  }, [selectedOption]);

  return (
    <div
      //   className={styles.battleScreenBottomTextBox}
      style={{
        background: "#000",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        margin: "0 auto",
        width: "90%",
        minHeight: "10vh",
        maxHeight: "15vh",
        height: "12.5vh",
        borderRadius: 10,
        display: "flex",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "70%",
          padding: "0.5rem",
          justifyContent: "start",
          display: "flex",
        }}
      >
        <p>This is the text box</p>
        <p>{battle.phase}</p>
        <p>ENEMY HP : {battle.enemy.healthPoint}</p>
        <p>PLAYER HP : {battle.player.healthPoint}</p>
      </div>
      <div
        style={{
          background: "purple",
          justifySelf: "right",
          width: "30%",
          minHeight: "15vh",
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
            <button
              onClick={() => {
                setSelectedOption("Attaquer");
              }}
            >
              Attaquer
            </button>
            <button onClick={() => setSelectedOption("Capacités")}>Capacités</button>
            <button onClick={() => setSelectedOption("Objets")}>Objets</button>
            <button onClick={() => setSelectedOption("Fuir")}>Fuir</button>
          </div>
        )}

        {selectedOption === "Attaquer" && (
          <>
            <div>
              <button
                onClick={() => {
                  const newBattle = playerRound(
                    playerBattleAbilities.eletricDischarge,
                    battle,
                  );

                  setBattle(newBattle);
                }}
                disabled={battlePhase != "playerTurn"}
              >
                {playerBattleAbilities.eletricDischarge.name}
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  const newBattle = playerRound(playerBattleAbilities.stomping, battle);

                  setBattle(newBattle);
                }}
                disabled={battlePhase != "playerTurn"}
              >
                {playerBattleAbilities.stomping.name}
              </button>
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
  );
}
