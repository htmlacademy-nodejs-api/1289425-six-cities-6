import {Category} from './category.type.js';

export type ServerOffer = {
  title: string;
  description: string;
  postDate: string;
  previewImage: string;
  price: number;
  categories: Category[];
  user:string;
}
