import { IFavoriteBase } from "./favorite.base";

export interface IResourceFavorite extends IFavoriteBase {
    type: "Ressourcer"
    color: string;
}