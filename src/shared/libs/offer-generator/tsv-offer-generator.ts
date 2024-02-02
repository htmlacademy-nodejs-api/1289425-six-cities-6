import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import {WeekDays} from '../../../const/week_days.js';
import {Prices} from '../../../const/prices.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const photo = getRandomItem<string>(this.mockData.photos);
    const price = generateRandomValue(Prices.MIN_PRICE, Prices.MAX_PRICE).toString();
    const author = getRandomItem(this.mockData.users);
    const categories = getRandomItems<string>(this.mockData.categories).join(';');

    const createdDate = dayjs()
      .subtract(generateRandomValue(WeekDays.FIRST_WEEK_DAY, WeekDays.LAST_WEEK_DAY), 'day')
      .toISOString();

    const [firstname] = author.split(' ');

    return [
      title, description, createdDate,
      photo, price, categories,
      firstname
    ].join('\t');
  }
}
