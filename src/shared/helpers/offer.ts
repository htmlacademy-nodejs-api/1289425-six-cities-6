import { ServerOffer} from '../types/index.js';

export function createOffer(offerData: string): ServerOffer {
  const [
    title,
    description,
    postDate,
    previewImage,
    price,
    categories,
    user
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    previewImage,
    user,
    postDate,
    price: Number.parseInt(price, 10),
    categories: categories.split(';')
      .map((name) => ({name})),
  };
}
