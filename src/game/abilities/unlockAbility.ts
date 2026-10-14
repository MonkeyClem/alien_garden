import type { Ability, UnlockedAbilities } from "./abilities.type";
export default function unlockAbilIty(
  currentAbilities: UnlockedAbilities,
  abilityToUnlock: Ability,
): UnlockedAbilities {
  return {
    ...currentAbilities,
    [abilityToUnlock]: true,
  };
}
