import type { BattleOptions } from "../BattleScreen";
import type {
  BattleAbility,
  BattleState,
  GameState,
  PlayerBattleAbilities,
} from "../../../App";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import {
  handleEnemyRoundDelay,
  handlePlayerRound,
  shouldBattleContinue,
} from "../battle.logic";

export interface BattleScreenBottomTextBoxProps {
  selectedOption: BattleOptions;
  playerBattleAbilities: PlayerBattleAbilities;
  battle: BattleState;
  setSelectedOption: Dispatch<SetStateAction<BattleOptions>>;
  setGameState: Dispatch<SetStateAction<GameState>>;
  setBattle: Dispatch<SetStateAction<BattleState | null>>;
}

async function handleBattleSequence(
  playerAttack: BattleAbility,
  battle: BattleState,
  setBattle: Dispatch<SetStateAction<BattleState | null>>,
) {
  // Orchestration du combat dans sa globalité
  let battleShouldContinue = shouldBattleContinue(battle);
  if (!battleShouldContinue) {
    window.alert("FIGHT OVER");
    return battle;
  }

  const battleAfterPlayerRound = handlePlayerRound(playerAttack, battle);
  setBattle(battleAfterPlayerRound);

  battleShouldContinue = shouldBattleContinue(battleAfterPlayerRound);

  if (!battleShouldContinue) return battleAfterPlayerRound;

  const battleAfterEnemyRound = await handleEnemyRoundDelay(battleAfterPlayerRound);
  setBattle(battleAfterEnemyRound);
  battleShouldContinue = shouldBattleContinue(battleAfterEnemyRound);

  if (!battleShouldContinue) return;
}

export default function BattleScreenBottomTextBox({
  selectedOption,
  playerBattleAbilities,
  battle,
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
        width: "98%",
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
            <button
              onClick={() => {
                setSelectedOption("Fuir");
              }}
            >
              Fuir
            </button>
          </div>
        )}

        {selectedOption === "Attaquer" && (
          <>
            <div>
              <button
                onClick={() => {
                  handleBattleSequence(
                    playerBattleAbilities.eletricDischarge,
                    battle,
                    setBattle,
                  );
                }}
                disabled={battle.phase != "playerTurn"}
              >
                {playerBattleAbilities.eletricDischarge.name}
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  handleBattleSequence(playerBattleAbilities.stomping, battle, setBattle);
                }}
                disabled={battle.phase != "playerTurn"}
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
            TO DO : INTRODUIRE LOGIQUE DE TENTATIVE DE FUITE
            <div>
              <button onClick={() => setSelectedOption(null)}>Retour</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
