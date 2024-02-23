import { Expose } from 'class-transformer';
import {Location} from '../../../types/index.js';
export class OfferDetailRDO {
  @Expose() name!: string;
  @Expose() description!: string;
  @Expose() public previewImage!: string;
  @Expose() postDate!: Date;
  @Expose() city!: string;
  @Expose() photos!: string[];
  @Expose() flagPremium!: boolean;
  @Expose() flagFavourite!: boolean;
  @Expose() rate!: number;
  @Expose() typeOfHouse!: string;
  @Expose() rooms!: number;
  @Expose() guests!: number;
  @Expose() price!: number;
  @Expose() userId!: string;
  @Expose() commentCount!: number;
  @Expose() location!: Location;
  @Expose() comfort!: string[];//Удобства.
}
