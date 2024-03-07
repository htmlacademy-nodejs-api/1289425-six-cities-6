import {IsMongoId, IsNumber, IsString, Length, Max, Min} from 'class-validator';
import {CreateCommentMessages} from './create-comment.messages.js';
import {CommentProps} from '../comment.constant.js';

export class CreateCommentDto {

  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(CommentProps.text.MIN_LENGTH, CommentProps.text.MAX_LENGTH, { message: CreateCommentMessages.text.length })
  public text!: string;

  @IsMongoId({message: 'Invalid offerId'})
  public offerId!: string;

  public userId!: string;

  @IsNumber()
  @Max(CommentProps.rating.MAX_LENGTH, {message: CreateCommentMessages.rating.invalidFormat })
  @Min(CommentProps.rating.MIN_LENGTH, { message: CreateCommentMessages.rating.invalidFormat })
  public rating!: number;

}
