import { serverOffer} from '../types/index.js';

export function createOffer(offerData: string): serverOffer {
  const [
    title,
    description,
    date,
    previewImage,
    price,
    categories,
    author
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    previewImage,
    author,
    date,
    price: Number.parseInt(price, 10),
    categories: categories.split(';')
      .map((name) => ({name})),
  };
}
