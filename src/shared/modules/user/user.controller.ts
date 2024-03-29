import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { UserService } from './user-service.interface.js';
import {
  BaseController,
  HttpError,
  HttpMethod,
  RequestBody,
  RequestParams, UploadFileMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {PinoLogger} from '../../libs/logger/index.js';
import {Component} from '../../types/index.js';
import {CreateUserRequest} from './create-user-request.type.js';
import {StatusCodes} from 'http-status-codes';
import { LoginUserRequest } from './login-user-request.type.js';
import { fillDTO } from '../../helpers/index.js';
import {Config} from 'convict';
import {RestSchema} from '../../libs/config/index.js';
import {CheckUserStatusDTO} from './dto/check-user-status.dto.js';
import {UserRdo} from './rdo/create-user.rdo.js';
import {AuthService} from '../auth/index.js';
import {LoggedUserRdo} from './rdo/logged-user.rdo.js';

type CheckStatusRequest = Request<RequestParams, RequestBody, CheckUserStatusDTO>

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: PinoLogger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.checkStatus});
    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.checkAuthenticate});
    this.addRoute({path: '/logout', method: HttpMethod.Post, handler: this.logout});
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public getControllerName() {
    return 'UserController';
  }

  public async create({ body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);
    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }
    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async checkStatus({ body }: CheckStatusRequest, res: Response): Promise<void> {
    const user = await this.userService.findByEmail(body.email);
    if(!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User unauthorized  «${body.email}» `,
        this.getControllerName()
      );
    }
    this.ok(res, fillDTO(UserRdo, user));
  }

  public async login(
    { body }: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);

    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, {
      email: user.email,
      token
    });
    this.ok(res, responseData);
  }

  public async logout({ body }: CheckStatusRequest, _res: Response): Promise<void> {
    const user = await this.userService.findByEmail(body.email);
    if(!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not authorized.`,
        this.getControllerName()
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'User not implemented',
      this.getControllerName()
    );
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }

  public async checkAuthenticate({ tokenPayload: { email }}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (! foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

}
