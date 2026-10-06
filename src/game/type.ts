import type { Species } from "./plants/plants.type"

//DECORATIONS ASSETS
export type selectionType = "empty" | "plant" | "decoration" | null

//GAMEPLAY ASSETS
export type Ressources = {
    bioMass : number
    bioEnergy : number, 
    biologicalData : number
  }

export type Inventory =  { 
  species : Record<Species, number> 
}