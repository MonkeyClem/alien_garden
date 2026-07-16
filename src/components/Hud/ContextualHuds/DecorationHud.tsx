import type { GameAssets } from "../../../assets/assetTypes";
import type { Decoration } from "../../../game/decorations/decoration.type";

interface DecorationHudProps{
    decorationOnTile : Decoration,
    assets: GameAssets,
}


export default function DecorationHud(
    {decorationOnTile, assets} : DecorationHudProps
){
    return  <div>
              <h3>{decorationOnTile.assetKey}</h3>
              <img
                src={assets[decorationOnTile.assetKey].src}
                style={{
                  width: 124,
                  height: 124,
                  objectFit: "contain",
                  // imageRendering: "pixelated",
                }}
              />
            </div>
}