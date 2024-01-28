import {Category} from "./category.type.js";
import {Location} from "./location.type.js";
import {City} from "./city.type.js";

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  date:string[];
  city:City[];
  previewImage:string[];
  photos: string[];
  flagPremium: boolean[];
  flagFavourite: boolean[];
  rate: number[];
  types: string[];//тип размещения
  rooms: number[];
  guests: number[];
  price: number[];
  users: string[];//только имя
  numberOfComments:number[];
  locations:Location[];
  categories: Category[];//удобства
};
