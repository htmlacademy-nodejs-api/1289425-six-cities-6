import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { UserService } from './user-service.interface.js';
import {BaseController, HttpMethod} from '../../libs/rest/index.js';
import {PinoLogger} from '../../libs/logger/index.js';
import {Component} from '../../types/index.js';
//import {DefaultUserService} from './default-user.service.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: PinoLogger,
    //@ts-ignore
    @inject(Component.UserService) private readonly DefaultUserService: UserService
  ) {
    super(logger)

    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.checkStatus });
    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login });
    this.addRoute({ path: '/logout', method: HttpMethod.Post, handler: this.logout });
  }

  public async create(_req: Request, _res: Response): Promise<void> {
      throw new Error('[UserController] Oops');
  }

  public checkStatus(_req: Request, _res: Response): void {
    // Проверка статуса авторизации пользователя
  }

  public login(_req: Request, _res: Response): void {
    // Авторизация пользователя
  }

  public logout(_req: Request, _res: Response): void {
    // Разавторизация пользователя
  }
}
