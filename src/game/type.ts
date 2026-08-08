import type { Species } from "./plants/plants.type"

//DECORATIONS ASSETS
export type selectionType = "empty" | "plant" | "decoration" | "building" | null

//GAMEPLAY ASSETS
export type Ressources = {
    biomass : number
    bioEnergy : number, 
    biologicalData : number
  }

export type Inventory =  { 
  species : Record<Species, number> 
}