export type User = {
  id:string | undefined,
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
