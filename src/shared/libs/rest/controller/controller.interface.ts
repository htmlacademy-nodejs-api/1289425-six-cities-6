import {Response, Router} from 'express';
import {Route} from '../route/route.interface.js';

export interface Controller {
  readonly router: Router;
  addRoute(route: Route): void;
/*
  addRoute(route: {
    path: string;
    handler: ({body}: any, res: e.Response) => Promise<void>;
    method: HttpMethod
  }): void;


 */
  send<T>(res: Response, statusCode: number, data: T): void;
  ok<T>(res: Response, data: T): void;
  created<T>(res: Response, data: T): void;
  noContent<T>(res: Response, data: T): void;
}
