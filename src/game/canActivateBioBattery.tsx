import type { UnlockedAbilities } from "./abilities/abilities.type";
import type { BioBatteryStatus, Ressources } from "./type";

export const BIO_BATTERY_ACTIVATION_COST = 10;

export function canActivateBioBattery(
  status: BioBatteryStatus,
  unlockedAbilities: UnlockedAbilities,
  ressources: Ressources,
): boolean {
  if (status === "active") return false;
  if (!unlockedAbilities.electricDischarge) return false;
  if (ressources.bioEnergy < BIO_BATTERY_ACTIVATION_COST) return false;

  return true;
}
