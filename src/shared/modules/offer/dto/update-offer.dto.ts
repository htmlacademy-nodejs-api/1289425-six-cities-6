import {Location} from '../../../types/index.js';


export class UpdateOfferDto {
  public offerId!: string;
  public title?: string;
  public description?: string;
  public previewImage?: string;
  public postDate?: Date;
  public city?: string;
  public photos?: string[];
  public flagPremium?: boolean;
  public flagFavourite?: boolean;
  public rate?: number;
  public typeOfHouse?: string;
  public rooms?: number;
  public guests?: number;
  public price?: number;
  public userId?: number;
  public commentCount?: number;//Количество комментариев. Рассчитывается автоматически;
  public location?: Location;
  public comfort?: string[];
}
