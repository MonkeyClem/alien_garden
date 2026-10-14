import type { Ability, UnlockedAbilites } from "./abilities.type";
export default function unlockAbilIty(
  currentAbilities: UnlockedAbilites,
  abilityToUnlock: Ability,
): UnlockedAbilites {
  return {
    ...currentAbilities,
    [abilityToUnlock]: true,
  };
}
