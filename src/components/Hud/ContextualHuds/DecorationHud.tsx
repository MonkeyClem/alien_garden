import type { GameAssets } from "../../../assets/assetTypes";
import type { Decoration } from "../../../game/decorations/decoration.type";

interface DecorationHudProps {
  decorationOnTile: Decoration;
  assets: GameAssets;
}

export default function DecorationHud({
  decorationOnTile,
  assets,
}: DecorationHudProps) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{
        textAlign: "left",
      }}>
        <h3 style={{
            textTransform: "uppercase",
                  fontWeight: 800,
                  color: "#76cee4",
        }}>{decorationOnTile.displayName}</h3>
        <p style={{

        }}>{decorationOnTile.description}</p>
      </div>

      <div>
        <img
          src={assets[decorationOnTile.assetKey].src}
          style={{
            width: 124,
            height: 124,
            objectFit: "contain",
            imageRendering: "pixelated",
          }}
        />
      </div>
    </div>
  );
}
