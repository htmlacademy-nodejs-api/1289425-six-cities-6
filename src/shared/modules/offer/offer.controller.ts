import {inject, injectable} from 'inversify';
import {
  BaseController,
  HttpError,
  HttpMethod,
  RequestBody,
  RequestParams,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {FoundOffer, OfferService} from './offer-service.interface.js';
import {CommentRdo, CommentService} from '../comment/index.js';
import {UserService} from '../user/user-service.interface.js';
import {fillDTO} from '../../helpers/index.js';
import {OffersListItemRDO} from './rdo/offer-list-item.rdo.js';
import {OfferRDO} from './index.js';
import { Request, Response } from 'express';
import {GetOfferDTO} from './dto/get-offer.dto.js';
import {UpdateOfferDto, CreateOfferDto} from './index.js';
import {StatusCodes} from 'http-status-codes';
import { ParamOfferId } from './types/param-offerid.type.js';
import {OfferDetailRDO} from './rdo/offer-detail.rdo.js';

type GetOfferRequest = Request<RequestParams, RequestBody, GetOfferDTO>
type CreateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
type UpdateOfferRequest = Request<RequestParams, RequestBody, UpdateOfferDto>
type DeleteOfferRequest = Request<RequestParams, RequestBody, GetOfferDTO>
type GetPremiumOffers = Request<RequestParams, RequestBody, UpdateOfferDto>
type GetFavoriteOffers = Request<RequestParams, RequestBody, UpdateOfferDto>
@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) protected readonly offerService: OfferService,
    @inject(Component.CommentService) protected readonly commentService: CommentService,
    @inject(Component.UserService) protected readonly userService: UserService,
  ) {
    super(logger);

    this.addRoute({path: '/index', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/create', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/favorites/:userId', method: HttpMethod.Get, handler: this.getFavorites});
    this.addRoute({path: '/premium/:cityName', method: HttpMethod.Get, handler: this.getPremium});
    this.addRoute({path: '/show/:offerId',
      method: HttpMethod.Get, handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({path: '/update/:offerId', method: HttpMethod.Patch, handler: this.update, middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({path: '/delete/:offerId', method: HttpMethod.Delete, handler: this.delete, middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.Get, handler: this.getComments,middlewares: [new ValidateObjectIdMiddleware('offerId')] });
    this.logger.info('Offer Controller Init');
  }

  public getControllerName(): string {
    return 'OfferController';
  }

  public async index(_req: Request, res: Response): Promise<void> {//получить список
    const offers = await this.offerService.find();

    this.ok(res, fillDTO(OffersListItemRDO, offers));
  }

  public async show({params}: GetOfferRequest, res: Response): Promise<void> {// получить по ID
    const {offerId} = params;
    const offer = await this.exists(offerId);

    this.ok(res, fillDTO(OfferDetailRDO, offer));
  }

  public async create({body}: CreateOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.create(body);

    this.created(res, fillDTO(OfferRDO, offer));
  }

  public async update({body, params}: UpdateOfferRequest, res: Response): Promise<void> {
    const {offerId} = params;
    const updatedOffer = await this.offerService.updateById(offerId, body);

    this.ok(res, fillDTO(OfferRDO, updatedOffer));
  }

  public async delete({params}: DeleteOfferRequest, res: Response): Promise<void> {
    const {offerId} = params;
    const offer = await this.exists(offerId as string);

    await this.offerService.deleteById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController');
    }

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, fillDTO(GetOfferDTO, offer));
  }

  public async getFavorites({ params }: GetFavoriteOffers, res: Response): Promise<void> {
    const { userId } = params;
    const user = await this.userService.exists(userId);

    if(!user) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `UserId is not found : ${userId}`,
        this.getControllerName()
      );
    }

    const offers = await this.userService.getFavoriteOffers(userId);

    this.ok(res, fillDTO(OfferRDO, offers));
  }

  public async getPremium({ params }: GetPremiumOffers, res: Response): Promise<void> {
    const { cityName } = params;
    const offers = await this.offerService.getPremiumByCity(cityName);

    if(!offers || offers.length <= 0) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `City not found :  ${cityName}`,
        this.getControllerName()
      );
    }

    this.ok(res, fillDTO(OfferRDO, offers));
  }

  private async exists(offerId: string): FoundOffer {
    const offer = await this.offerService.findById(offerId);

    if(!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer not found : ${offerId}`,
        this.getControllerName()
      );
    }

    return offer;
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    if (!await this.offerService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

}
