import {Location} from './location.type.js';

export type serverOffer = {
  title: string;
  description: string;
  previewImage: string;
  postDate: Date;
  city: string;
  photos: string[];
  flagPremium: boolean;
  flagFavourite: boolean;
  rate: number;
  typeOfHouse: string;
  rooms: number;
  guests: number;
  price: number;
  userId: number;
  commentCount: number;//Количество комментариев. Рассчитывается автоматически;
  location: Location;
  comfort: string[];//Удобства.
}
