import { Logger } from '../shared/libs/logger/index.js';
import {Config, RestSchema} from '../shared/libs/config/index.js';
import {Component} from '../shared/types/index.js';
import {inject, injectable} from 'inversify';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import express, { Express } from 'express';
import {UserController} from '../shared/modules/user/index.js';
import {ExceptionFilter} from '../shared/libs/rest/index.js';
import { ParseTokenMiddleware } from '../shared/libs/rest/index.js'
import cors from 'cors';

@injectable()
export class RestApplication {
  private readonly server: Express;
  constructor(
  @inject(Component.Logger) private readonly logger: Logger,
  @inject(Component.Config) private readonly config: Config<RestSchema>,
  @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  @inject(Component.UserController) private readonly userController: UserController,
  @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter,
  ) {
    this.server = express();
  }

  private async _initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
  }

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/users', this.userController.router);
  }

  private async initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.server.use(express.json());
    this.server.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware))
    this.server.use(cors());
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init exception filters');
    await this._initExceptionFilters();
    this.logger.info('Exception filters initialization compleated');

    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');

    this.logger.info('Try to init server…');
    await this._initServer();
    this.logger.info(`🚀 Server started on http://localhost:${this.config.get('PORT')}`);

    this.logger.info('Try to init Controllers…');
    await this.initControllers();
    this.logger.info('Controllers init');

    this.logger.info('Try to init Middleware…');
    await this.initMiddleware();
    this.logger.info('Middleware init');

  }
}
