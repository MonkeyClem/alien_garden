export const SPECIES_CONFIG = {
  reactorMushroom: {
    displayName: "Champignon Réacteur",
    description: "Transforme la biomasse et soutient les systèmes énergétiques.",
    role: "Production de biomasse",
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

  crystalFlower: {
    displayName: "Cristal-Fleur",
    description: "Analyse le vivant et produit des données biologiques.",
    role: "Recherche",
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

  synapticVine: {
    displayName: "Vigne Synaptique",
    description: "Relie les organismes et les systèmes de la station.",
    role: "Connexion",
    harvestYield: {},
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
        description: "La connexion peut transmettre énergie et données.",
      },
    },
  },
} as const;