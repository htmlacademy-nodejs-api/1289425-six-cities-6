import {IsMongoId, IsNumber, IsString, Length, Max, Min} from 'class-validator';
import {CreateCommentMessages} from './create-comment.messages.js';

export class CreateCommentDto {

  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(5, 1024, { message: CreateCommentMessages.text.length })
  public text!: string;

  @IsMongoId()
  public offerId!: string;

  @IsMongoId()
  public userId!: string;

  @IsNumber()
  @Max(5, { message: CreateCommentMessages.rating.invalidFormat })
  @Min(1, { message: CreateCommentMessages.rating.invalidFormat })

  public rating!: number;

}
