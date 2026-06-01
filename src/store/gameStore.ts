import { create } from "zustand/react";
import type { Tile } from "../game/type";


export type GameStoreProps = {
    selectedTile : Tile,
    setSelectedTile : (tile : Tile | null) => void
}
export const UseGameStore = create<GameStoreProps>((set) => ({
     selectedTile: null,
     setSelectedTile: (tile) => {
        set({selectedTile : tile});
     }
}))