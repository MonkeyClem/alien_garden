import type { Ability } from "../../../game/abilities/abilities.type";

export default function newAbilityUnlockNotification(
  newlyUnlockAbility: Ability,
  //   setNewlyUnlockAbility: React.Dispatch<SetStateAction<Ability | null>>,
) {
  return (
    <>
      <div>
        <h3>Nouvelle capacité débloquée : {newlyUnlockAbility}</h3>
      </div>
    </>
  );
}
