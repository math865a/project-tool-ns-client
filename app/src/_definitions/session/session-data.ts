import { RawAbility } from "../ability";
import { Favorite } from "../favorites";
import { UserData } from "./session-user-data";

export class SessionData {
    public readonly user: UserData;
    public readonly rawAbilities: RawAbility[];
    public readonly favorites: Favorite[];
    public readonly onlineUsers: UserData[]
}
