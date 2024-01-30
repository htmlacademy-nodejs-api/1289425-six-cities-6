interface City {
  name:string
  locations:{
    latitude:number,
    longitude:number
  }
}

export const Cities:City[] = [
  {name:'Paris',locations:{latitude: 48.85661, longitude: 2.351499}},
  {name:'Cologne',locations:{latitude: 50.938361, longitude: 6.959974}},
  {name:'Brussels',locations:{latitude: 50.846557, longitude: 4.351697}},
  {name:'Amsterdam',locations:{latitude: 52.370216, longitude: 4.895168}},
  {name:'Amsterdam',locations:{latitude: 52.370216, longitude: 4.895168}},
  {name:'Hamburg',locations:{latitude: 53.550341, longitude: 10.000654}},
  {name:'Dusseldorf',locations:{latitude: 51.225402, longitude: 6.776314}}
];
