import {Location} from "../../../types/index.js";

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public previewImage!: string;
  public postDate!: Date;
  public city!: string;
  public photos!: string[];
  public flagPremium!: boolean;
  public flagFavourite!: boolean;
  public rate!: number;
  public typeOfHouse!: string;
  public rooms!: number;
  public guests!: number;
  public price!: number;
  public userId!: string;
  public commentCount!: number;
  public location!: Location;
  public comfort!: string[];//Удобства.
}
