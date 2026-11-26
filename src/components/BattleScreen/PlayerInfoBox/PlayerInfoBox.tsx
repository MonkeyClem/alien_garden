import type { JSX } from "react";
import type { Fighter } from "../../../App";
import FighterHealthBar from "./FighterHealthBar/FighterHeathBar";

interface PlayerInfoBoxProps {
  asset: HTMLImageElement;
  fighter: Fighter;
  alignement: "left" | "right";
}

// TO DO : ORRIGER EN FIGHTERINFOBOX
export default function PlayerInfoBox({
  asset,
  fighter,
  alignement,
}: PlayerInfoBoxProps): JSX.Element {
  return (
    <div
      style={{
        background: "transparent",
        flex: 1,
        height: "50%",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          background: "black",
          marginRight: "2.5%",
          width: "30%",
          [alignement]: "65%",
          marginTop: alignement === "left" ? "2%" : "",
          top: alignement === "left" ? "35%" : "2%",
          padding: "1rem",
          boxSizing: "border-box",
          border: "2.5px solid #087E9B",
          borderRadius: 10,
        }}
      >
        <p>{fighter.name}</p>
        <p>
          {fighter.healthPoint} / {fighter.maxHealthPoint}
        </p>
        <FighterHealthBar
          healthPoint={fighter.healthPoint}
          maxHealthPoint={fighter.maxHealthPoint}
        />
      </div>
      <img
        src={asset.src}
        alt="Humanivore"
        style={{
          position: "absolute",
          width: "25%",
          height: "auto",
          [alignement]: "15%",
          bottom: alignement === "left" ? 150 : "",
          top: alignement === "left" ? "" : 150,
          objectFit: "contain",
        }}
      />
    </div>
  );
}
