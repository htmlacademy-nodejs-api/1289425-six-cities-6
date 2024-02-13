import {OfferDB} from '../types/index.js';

export function createOffer(offerData: string): OfferDB {
  const [
    title,
    description,
    previewImage,
    postDate,
    city,
    photos,
    flagPremium,
    flagFavourite,
    rate,
    typeOfHouse,
    rooms,
    guests,
    price,
    userId,
    commentCount,
    location,
    comfort
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    previewImage,
    postDate: new Date(postDate),
    city,
    photos:photos.split(','),
    flagPremium:flagPremium === flagPremium,
    flagFavourite: flagFavourite === flagFavourite,
    rate:Number.parseInt(rate, 10),
    typeOfHouse,
    rooms: Number.parseInt(rooms, 10),
    guests: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    userId:Number.parseInt(userId, 10),
    commentCount: Number.parseInt(commentCount, 10),
    location:{latitude: Number.parseFloat(location.split(',')[0]),
      longitude: Number.parseFloat(location.split(',')[1]),},
    comfort: comfort.split(',')
  };
}
