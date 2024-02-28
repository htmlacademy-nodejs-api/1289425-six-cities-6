export const CreateUpdateOfferMessages = {
  text: {
    invalidFormat: 'text is required',
  },
  description: {
    invalidFormat: 'Description is required',
  },
  lengthShort: {
    lengthField: 'min length for password is 10, max is 100'
  },
  lengthLong: {
    lengthField: 'min length for password is 20, max is 1024'
  },
  image: {
    invalidFormat: 'Image is required',
  },
  number: {
    invalidFormat: 'Number is required',
  },
  quantity: {
    invalidQuantity: 'Write quantity'
  },
  boolean: {
    invalidFormat: 'Write Yes or No '
  },
  photos: {
    invalidFormat: 'List of photos is required',
    SIX_PHOTOS:'Six photos should be',
    MIN_COUNT:6
  },
  comfort: {
    invalidFormat: 'List of conveniences is required'
  },
  location: {
    invalidFormat: 'Write Location'
  },
  userId:{
    INVALID_ID:'Invalid UserId'
  },
  rooms:{
    MIN:'Min number of rooms is 1',
    MAX:'Max number of rooms is 8'
  },
  rating:{
    MIN:'Min rating is 1',
    MAX:'Max rating is 5'
  },
  guests:{
    MIN:'Min quantity of guests is 1',
    MAX:'Max quantity of guests is 10'
  },
  price: {
    MIN: 'Min price is 100 euro',
    MAX: 'Max price is 100000 euro',
  },
  date:{
    INVALID:'Date is Invalid'
  },
  city:{
    Invalid:'City is invalid'
  },
} as const;
