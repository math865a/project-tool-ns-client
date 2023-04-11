import { createMongoAbility } from "@casl/ability";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { Ability, AbilityTuple, RawAbility } from "~/src/_definitions";

export const useAbilities = (rawAbilities: RawAbility[], socket?: Socket) => {
    const [Abilities, setAbilities] = useState<Ability>(() =>
        createMongoAbility<AbilityTuple>(rawAbilities)
    );

    return Abilities;
};
