import {IsArray, IsEmail, IsEnum, IsMongoId, IsString, Length} from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';
import {userType} from '../../../types/index.js';

export class CreateUserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email!: string;

  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public name!: string;

  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @IsEnum(userType, { message: CreateUserMessages.name.invalidFormat })
  public userType!: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password!: string;

  @IsString({ message: CreateUserMessages.name.invalidFormat })
  public avatarPath?: string;

  @IsMongoId({ each: true })
  @IsArray()
  public favoriteOffers!: string[];
}
