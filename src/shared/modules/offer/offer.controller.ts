import {inject, injectable} from 'inversify';
import {
  BaseController, DocumentExistsMiddleware,
  HttpError,
  HttpMethod, PrivateRouteMiddleware,
  RequestBody,
  RequestParams, ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {FoundOffer, OfferService} from './offer-service.interface.js';
import {CommentRdo, CommentService} from '../comment/index.js';
import {UserService} from '../user/index.js';
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
    //show all Offers
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    //create Offer
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new PrivateRouteMiddleware(),
      new ValidateDtoMiddleware(CreateOfferDto)
    ]});
    //get Offer by offerID
    this.addRoute({path: '/:offerId',
      method: HttpMethod.Get, handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    //update Offer by offerID
    this.addRoute({path: '/update/:offerId', method: HttpMethod.Patch, handler: this.update, middlewares: [
      new PrivateRouteMiddleware(),new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(UpdateOfferDto), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),]
    });
    //delete Offer by offerID
    this.addRoute({path: '/delete/:offerId', method: HttpMethod.Delete, handler: this.delete, middlewares: [
      new PrivateRouteMiddleware(),
      new ValidateObjectIdMiddleware('offerId'),
      new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),]
    });
    //Get Comments to the Offer by offerID
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.Get, handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    //Get Offers which are Favorite for this user
    this.addRoute({path: '/favorites/:userId', method: HttpMethod.Get, handler: this.getFavorites,
      middlewares: [
        new ValidateObjectIdMiddleware('userId')
      ]
    });
    //Mark Offer as Favorite for this user by OfferId
    this.addRoute({path: '/favorites/:offerId', method: HttpMethod.Post, handler: this.setFavorites,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId')
      ]
    });
    //Get Premium Offers for this city
    this.addRoute({path: '/premium/:cityName', method: HttpMethod.Get, handler: this.getPremium});

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

  public async create({body, tokenPayload}: CreateOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.create({ ...body, userId: tokenPayload.id });

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

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, fillDTO(GetOfferDTO, offer));
  }

  public async getFavorites({ params }: GetFavoriteOffers, res: Response): Promise<void> {
    const { userId } = params;

    const offers = await this.userService.getFavoriteOffers(userId);

    this.ok(res, fillDTO(OfferRDO, offers));
  }

  public async setFavorites({body, params}: UpdateOfferRequest, res: Response): Promise<void> {
    const {offerId} = params;
    const updatedOffer = await this.offerService.updateById(offerId, body);

    this.ok(res, fillDTO(OfferRDO, updatedOffer));
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

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
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

}
