import type { BattleOptions } from "../BattleScreen";
import type { PlayerBattleAbilities } from "../../../App";
import type React from "react";
import type { SetStateAction } from "react";

export interface BattleScreenBottomTextBoxProps {
  selectedOption: BattleOptions;
  playerBattleAbilities: PlayerBattleAbilities;
  setSelectedOption: React.Dispatch<SetStateAction<BattleOptions>>;
}

export default function BattleScreenBottomTextBox({
  selectedOption,
  playerBattleAbilities,
  setSelectedOption,
}: BattleScreenBottomTextBoxProps) {
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
  );
}
