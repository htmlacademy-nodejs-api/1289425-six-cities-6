import { UserService } from './user-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import {CreateUserDto, UserEntity} from './index.js';
import pino from 'pino';
import Logger = pino.Logger;
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, { new: true })
      .exec();
  }

  public async exists(userId: string): Promise<boolean> {
    const user = await this.userModel.exists({ _id: userId });

    return user !== null;
  }

  public async getFavoriteOffers(userId: string): Promise<string[] | null>{
    const user = await this.userModel
      .findById(userId)
      .exec();

    return user?.favoriteOffers ?? null;
  }

  public async addToFavorites(userId: string, offerId:string): Promise<DocumentType<UserEntity> | null>{
    const user = await this.userModel.findById(userId);
    const userFavorites: string[] = user?.favoriteOffers ?? [];

    if(userFavorites.includes(offerId)) {
      return null;
    }

    userFavorites.push(offerId);

    return this.userModel
      .findByIdAndUpdate(
        userId,
        {favoriteOffers: userFavorites},
        {new: true}
      );
  }
}
