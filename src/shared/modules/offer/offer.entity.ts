import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
//import { OfferDB } from '../../types/index.js';
//import { CategoryEntity } from '../category/index.js';
import { UserEntity } from '../user/index.js';
import {TypeOfHouse} from "../../types/house.enum.js";

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
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public previewImage!: string;

  @prop()
  public postDate!: Date;

  @prop()
  public city!: string;

  @prop()
  photos!: string[];

  @prop()
  flagPremium!: boolean;

  @prop()
  flagFavourite!: boolean;

  @prop()
  rate!: number;

  @prop({
    type: () => String,
    enum:TypeOfHouse
  })
  public typeOfHouse!: typeof TypeOfHouse;//??

  @prop()
  rooms!: number;

  @prop()
  guests!: number;

  @prop()
  public price!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentCount!: number;

  /* // Здесь будет категория  - удобства
  @prop({
    ref: CategoryEntity,
    required: true,
    default: [],
    _id: false
  })
  public categories!: Ref<CategoryEntity>[];
  */

}

export const OfferModel = getModelForClass(OfferEntity);
