import {Category} from "./category.type.js";

export type serverOffer = {
  title:string,
  description:string,
  date:string,
  previewImage:string,
  price:number,
  categories:Category[],
  author:string
}
