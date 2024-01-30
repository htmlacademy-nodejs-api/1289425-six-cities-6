import {Category} from './category.type.js';
import {Location} from './location.type.js';

export type Offer = {
  title: string;
  description: string;
  date: string;
  city: string;
  previewImage: string,
  photos: string[];
  flagPremium: boolean;
  flagFavourite: boolean;
  rate: number;
  typeOfHouse: string;
  rooms: number;
  guests: number;
  price: number;
  author: string;
  numberOfComments: number,//Количество комментариев. Рассчитывается автоматически;
  location: Location;
  categories: Category[];//Удобства.
}

