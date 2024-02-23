import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './index.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import {UpdateUserDto} from './dto/update-user.dto.js'
import { FoundOffers } from '../offer/index.js';

export type UserDoc = DocumentType<UserEntity>;
export type FoundUser = Promise<UserDoc | null>
export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
  getFavoriteOffers(userId: string): FoundOffers;
  exists(userId: string): Promise<boolean>;
}
