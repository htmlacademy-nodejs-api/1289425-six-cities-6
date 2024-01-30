export type User = {
  name:string,
  email:string,
  avatarPath?:string,
  password:string,
  userType:string,
}

export enum userType {
  basic = 'обычный',
  pro = 'pro'
}
