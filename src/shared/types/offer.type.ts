import {Category} from './category.type.js';
import {Coord} from './coord.type.js';
export type Offer = {
  title: string;
  description: string;
  date: string;
  town: string;
  previewImage: string,
  photos: string[];
  flagPremium: boolean;
  flagFavourite: boolean;
  rate: number;
  typeOfHouse: string;
  rooms: number;
  guests: number;
  price: number;
  categories: Category[];//Удобства.
  author: string;
  numberOfComments: number,//Количество комментариев. Рассчитывается автоматически;
  coords: Coord;
}

