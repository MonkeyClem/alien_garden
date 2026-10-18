import type { Ability } from "../../../game/abilities/abilities.type";

export default function newAbilityUnlockNotification(newlyUnlockAbility: Ability) {
  return (
    <div>
      <h3>Nouvelle capacité débloquée : {newlyUnlockAbility}</h3>
    </div>
  );
}
