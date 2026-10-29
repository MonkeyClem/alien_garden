import type { TransmissionId, Transmission } from "../transmissions.type";

export const transmissionsConfig: Record<TransmissionId, Transmission> = {
  firstTransmission: {
    id: "firstTransmission",
    title: "confirmLanding",
    texts: [
      "Unité d'exploration E-416,\nNous détectons une interruption de l'alimentation de la Bio Batterie et avons besoin de votre intervention.",
      "Des spores de champignons réacteurs sont présents à bord votre pod d'expédition.\nVotre équipement autorise le transport simultané de trois spécimens",
      "Nous reviendrons vers vous une fois l'alimentation restaurée.\n\nL'humanité n'oubliera pas",
    ],
  },
  secondTransmission: {
    id: "secondTransmission",
    title: "anomalyDetected",
    texts: [
      "Unité d'exploration E-416, nous venons de constater que la Bio Batterie à été réactivée. Félicitations. Nous vous octroyons 5 Données Biologiques en guise de récompense",
      "Nous avons désormais une autre mission à vous confier.\nUne activité biologique à été detectée près du lac de votre jardin. Merci d'aller inspecter cette zone",
      "N'hésitez pas à revenir vers nous une fois l'origine de l'anomalie identifée.\n\n\nSLOGAN TYPIQUE DE L'ORGANISATION(à définir)",
    ],
  },
};
