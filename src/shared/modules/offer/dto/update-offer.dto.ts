import {Location} from '../../../types/index.js';
import {
  ArrayMinSize, IsArray,
  IsBoolean,
  IsDateString, IsEnum,
  IsIn,
  IsInt, IsMongoId, IsObject,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  MinLength
} from 'class-validator';
import {CreateUpdateOfferMessages} from './create-update-offer.messages.js';
import {cities1} from '../../../../const/cities.js';
import {OfferProps} from '../offer.constant.js';
import {TypeOfHouse1} from '../../../types/house.enum.js';


export class UpdateOfferDto {
  @IsString({ message: CreateUpdateOfferMessages.text.invalidFormat })
  @Length(OfferProps.name.MIN_LENGTH, OfferProps.name.MAX_LENGTH, { message: CreateUpdateOfferMessages.lengthShort.lengthField })
  public title!: string;

  @IsString({ message: CreateUpdateOfferMessages.description.invalidFormat })
  @Length(OfferProps.description.MIN_LENGTH, OfferProps.description.MAX_LENGTH, { message: CreateUpdateOfferMessages.lengthLong.lengthField })
  public description!: string;

  @IsUrl({}, { message: CreateUpdateOfferMessages.image.invalidFormat })
  public previewImage!: string;

  @IsDateString({}, { message: CreateUpdateOfferMessages.date.INVALID })
  public postDate!: Date;

  @IsString({ message: CreateUpdateOfferMessages.text.invalidFormat })
  @IsIn(cities1, { message: CreateUpdateOfferMessages.city.Invalid })
  public city!: string;

  @ArrayMinSize(OfferProps.photos.MIN_COUNT, { message: CreateUpdateOfferMessages.photos.SIX_PHOTOS })
  @IsArray({ message: CreateUpdateOfferMessages.photos.invalidFormat})
  public photos!: string[];

  @IsBoolean({ message: CreateUpdateOfferMessages.boolean.invalidFormat })
  public flagPremium!: boolean;

  @IsBoolean({ message: CreateUpdateOfferMessages.boolean.invalidFormat })
  public flagFavourite!: boolean;

  @IsInt({ message: CreateUpdateOfferMessages.number.invalidFormat })
  @MinLength(OfferProps.rating.MIN, { message: CreateUpdateOfferMessages.rating.MIN })
  @MaxLength(OfferProps.rating.MAX, { message: CreateUpdateOfferMessages.rating.MAX })
  public rate!: number;

  @IsString({ message: CreateUpdateOfferMessages.text.invalidFormat })
  @IsEnum(TypeOfHouse1, { message: CreateUpdateOfferMessages.text.invalidFormat })
  public typeOfHouse!: string;

  @IsInt({ message: CreateUpdateOfferMessages.number.invalidFormat })
  @MinLength(OfferProps.rooms.MIN, { message: CreateUpdateOfferMessages.rooms.MIN })
  @MaxLength(OfferProps.rooms.MAX, { message: CreateUpdateOfferMessages.rooms.MAX })
  public rooms!: number;

  @IsInt({ message: CreateUpdateOfferMessages.number.invalidFormat })
  @MinLength(OfferProps.guests.MIN, { message: CreateUpdateOfferMessages.guests.MIN })
  @MaxLength(OfferProps.guests.MAX, { message: CreateUpdateOfferMessages.guests.MAX })
  public guests!: number;

  @IsInt({ message: CreateUpdateOfferMessages.number.invalidFormat })
  @MinLength(OfferProps.price.MIN, { message: CreateUpdateOfferMessages.price.MIN })
  @MaxLength(OfferProps.price.MAX, { message: CreateUpdateOfferMessages.price.MAX })
  public price!: number;

  @IsMongoId({ message: CreateUpdateOfferMessages.userId.INVALID_ID })
  public userId!: string;

  @IsString({ message: CreateUpdateOfferMessages.number.invalidFormat })
  public commentCount!: number;

  @IsObject({ message: CreateUpdateOfferMessages.location.invalidFormat })
  public location!: Location;

  @IsArray({ message: CreateUpdateOfferMessages.comfort.invalidFormat })
  public comfort!: string[];//Удобства.
}
