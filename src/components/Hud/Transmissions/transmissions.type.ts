export type TransmissionId = "firstTransmission" | "secondTransmission";

export interface Transmission {
  id: TransmissionId;
  title: string;
  texts: string[];
}

export type Transmissions = Record<TransmissionId, Transmission>;
