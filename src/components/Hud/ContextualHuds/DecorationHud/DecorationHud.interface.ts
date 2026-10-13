import type React from "react";
import type { GameAssets } from "../../../../assets/assetTypes";
import type { Decoration } from "../../../../game/decorations/decoration.type";
import type { Inventory } from "../../../../game/inventory/inventory.type";
import type { SetStateAction } from "react";

export default interface DecorationHudProps {
  decorationOnTile: Decoration;
  assets: GameAssets;
  inventory: Inventory;
  setInventory: React.Dispatch<SetStateAction<Inventory>>;
}
