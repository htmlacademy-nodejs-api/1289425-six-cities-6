import {defaultClasses, getModelForClass, prop, modelOptions} from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  public id:string | undefined;

  @prop({type:String, required: true, default: 'Mike' })
  public name: string;

  @prop({type:String, unique: true, required: true})
  public email: string;

  @prop({type:String, required: false, default: ''})
  public avatarPath?: string;

  @prop({type:String, required: true })
  public password!: string;

  @prop({type:String, required: true })
  public userType!: string;

  @prop({type:String, required: true })
  public favoriteOffers!: string[];

  constructor(userData: User) {
    super();
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.password = userData.password;
    this.userType = userData.userType;
    this.favoriteOffers = userData.favoriteOffers;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
