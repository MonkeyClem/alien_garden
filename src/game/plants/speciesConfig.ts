import { Species, type SpeciesConfig } from "./plants.type";


export const SPECIES_CONFIG = {
  [Species.REACTOR_MUSHROOM]: {
    displayName: "Champignon Réacteur",
    description:
      "Transforme la biomasse et soutient les systèmes énergétiques.",
    role: "Production de biomasse",

    growthDuration: 20_000,

    harvestable: true, 
    harvestYield: {
      biomass: 5,
    },

    stages: {
      1: {
        label: "Germe mycélien",
        description: "La colonie commence à s’implanter.",
      },
      2: {
        label: "Colonie active",
        description: "Le réseau mycélien se développe.",
      },
      3: {
        label: "Réacteur mature",
        description: "La plante est prête à être récoltée.",
      },
    },
  },

  [Species.CRYSTAL_FLOWER]: {
    displayName: "Cristal-Fleur",
    description:
      "Analyse le vivant et produit des données biologiques.",
    role: "Recherche",

    growthDuration: 30_000,

    harvestable: true, 
    harvestYield: {
      biologicalData: 5,
    },

    stages: {
      1: {
        label: "Bourgeon cristallin",
        description: "Le cristal commence à se former.",
      },
      2: {
        label: "Structure résonnante",
        description: "La plante accumule des données.",
      },
      3: {
        label: "Fleur analytique",
        description: "L’échantillon est prêt à être analysé.",
      },
    },
  },

  [Species.SYNAPTIC_VINE]: {
    displayName: "Vigne Synaptique",
    description:
      "Relie les organismes et les systèmes de la station.",
    role: "Connexion",

    growthDuration: 25_000,

    harvestable: false, 

    stages: {
      1: {
        label: "Filament",
        description: "Une connexion fragile apparaît.",
      },
      2: {
        label: "Nerf biologique",
        description: "Le réseau devient fonctionnel.",
      },
      3: {
        label: "Liaison synaptique",
        description:
          "La connexion peut transmettre énergie et données.",
      },
    },
  },
}  satisfies Record<Species, SpeciesConfig>;