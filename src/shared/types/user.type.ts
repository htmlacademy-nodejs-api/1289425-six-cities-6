export type User = {
  name:string,
  email:string,
  avatarPath?:string,
  password:string,
  userType:string,
  favoriteOffers: string[]//Array of offerId
}

export enum userType {
  basic = 'обычный',
  pro = 'pro'
}
