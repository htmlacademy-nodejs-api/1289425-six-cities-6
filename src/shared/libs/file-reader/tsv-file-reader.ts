import {FileReader} from './file-reader.interface.ts';
import {readFileSync} from 'node:fs';
import {Offer} from '../../types/index.ts';
import {BooleanString} from '../../../const/boolean_string.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('|'))
      .map(([
        title,
        description,
        date,
        city,
        previewImage,
        photos,
        flagPremium,
        flagFavourite,
        rate,
        typeOfHouse,
        rooms,
        guests,
        price,
        author,
        numberOfComments,
        location,
        categories
      ]) => ({
        title,
        description,
        date,
        city,
        previewImage,
        photos: photos ? photos.split(',') : [],
        flagPremium: flagPremium === BooleanString.TRUE,
        flagFavourite: flagFavourite === BooleanString.TRUE,
        rate: Number.parseInt(rate, 10),
        typeOfHouse,
        rooms: Number.parseInt(rooms, 10),
        guests: Number.parseInt(guests, 10),
        price: Number.parseInt(price, 10),
        author,
        numberOfComments: Number.parseInt(numberOfComments, 10),
        location: {
          latitude: Number.parseFloat(location.split(',')[0]),
          longitude: Number.parseFloat(location.split(',')[1]),
        },
        categories: categories.split(',')
          .map((name) => ({name})),
      }));
  }
}
