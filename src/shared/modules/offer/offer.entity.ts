import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import {TypeOfHouse} from '../../types/house.enum.js';
import {Location} from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({type:String, trim: true, required: true })
  public title!: string;

  @prop({type:String, trim: true})
  public description!: string;

  @prop({type:String})
  public previewImage!: string;

  @prop({type:Date})
  public postDate!: Date;

  @prop({type:String})
  public city!: string;

  @prop({type:[String]})
    photos!: string[];

  @prop({type:Boolean})
    flagPremium!: boolean;

  @prop({type:Boolean})
    flagFavourite!: boolean;

  @prop({type:Number})
    rate!: number;

  @prop({
    type: () => String,
    enum:TypeOfHouse
  })
  public typeOfHouse!: typeof TypeOfHouse;

  @prop({type:Number})
    rooms!: number;

  @prop({type:Number})
    guests!: number;

  @prop({type:Number})
  public price!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({type:Number,default: 0})
  public commentCount!: number;

  @prop({type:[String]})
  public location!: Location;

  @prop({type:[String]})
  public comfort!: string[];//Удобства.
}

export const OfferModel = getModelForClass(OfferEntity);
