import { Ability, UserData } from "~/src/_definitions";
import { useFavorites } from "./favorites";
import { useFeedback } from "./feedback";
import { usePresence } from "./presence";


export type FeedbackBag = ReturnType<typeof useFeedback>;
export type PresenceBag = ReturnType<typeof usePresence>;
export type FavoriteBag = ReturnType<typeof useFavorites>;

export interface ISessionContext {
    abilities: Ability;
    presence: PresenceBag;
    feedback: FeedbackBag;
    favorites: FavoriteBag;
    user: UserData;
    token: string;
}
