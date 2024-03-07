import {IsArray, IsEmail, IsEnum, IsMongoId, IsString, Length} from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';
import {userType} from '../../../types/index.js';
import {UserProps} from '../user.constant.js';

export class CreateUserDto {
  public id!:string;
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email!: string;

  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(UserProps.name.MIN_LENGTH, UserProps.name.MAX_LENGTH, { message: CreateUserMessages.name.lengthField })
  public name!: string;

  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @IsEnum(userType, { message: CreateUserMessages.name.invalidFormat })
  public userType!: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(UserProps.password.MIN_LENGTH, UserProps.password.MAX_LENGTH, { message: CreateUserMessages.password.lengthField })
  public password!: string;

  @IsString({ message: CreateUserMessages.name.invalidFormat })
  public avatarPath?: string;

  @IsMongoId({ each: true })
  @IsArray()
  public favoriteOffers!: string[];
}
