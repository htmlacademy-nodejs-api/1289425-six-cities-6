import {IsEmail, IsString, Length} from 'class-validator';
import {CreateUserMessages} from './create-user.messages.js';

export class UpdateUserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email?: string;

  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public name?: string;

  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public userType?: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password?: string;

  @IsString({ message: CreateUserMessages.name.invalidFormat })
  public avatarPath?: string;
}
