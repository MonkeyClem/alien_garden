import type { DecorationAssetsKey } from "../../assets/assetTypes"

export type FootPrint = {width : number, height : number}


export type Decoration = {
  id: string
  tileId : number,
  assetKey : DecorationAssetsKey
  gridX: number
  gridY: number
  width: number
  height: number
  offsetX: number
  offsetY: number
  footPrint : FootPrint
}
