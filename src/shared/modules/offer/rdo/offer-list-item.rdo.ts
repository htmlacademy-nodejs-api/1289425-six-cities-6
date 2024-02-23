import { Expose } from 'class-transformer';
import {City} from "../../../types/city.type.js";

export class OffersListItemRDO {
  @Expose() public name!: string;
  @Expose() public date!: string;
  @Expose() public city!: City;
  @Expose() public previewImage!: string;
  @Expose() public flagPremium!: boolean;
  @Expose() public flagFavorite!: boolean;
  @Expose() public typeOfHouse!: string;
  @Expose() public price!: number;
  @Expose() public commentCount!: number;
}
