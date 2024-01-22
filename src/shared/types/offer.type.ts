import { Category } from './category.type.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  town:string;
  photos: string[];
  flagPremium:boolean;
  flagFavourite:boolean;
  rate:number;
  typeOfHouse: string;
  rooms:number;
  guests:number;
  price: number;
  categories: Category[];//Удобства.
  user: User;
  numberOfComments:number,//Количество комментариев. Рассчитывается автоматически;
  coords:string;
}
