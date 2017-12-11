import defaultConfig from './config';
import {distanceSort} from "../../../lib/util/vector";
import {sortResults} from "../../util/vector";

let config = {...defaultConfig};

export const configure = (apiKey, countries = {}, settings = {}) => {
  config = {...defaultConfig, ...settings, apikey: apiKey, countries}
};

const request = (name, location, focus) => {
  const more = focus ? `&ll=${focus[0]},${focus[1]}` : '';
  const text = name + (location ? `,${location}` : '');

  return config
    .request(`${config.searchAPI}geocode=${encodeURIComponent(text)}&format=json${more}&lang=${config.lang}`)
    .then(json => formatResponse(json, focus));
};

const get = (from, what) => {
  let position = from;
  what
    .split('.')
    .forEach(key => {
      if (position) {
        position = position[key]
      }
    })
  return position;
}

const formatResponse = (json, focus) => {
  let features = get(json, 'response.GeoObjectCollection.featureMember') || [];
  if (!features.length) {
    throw new Error('empty result');
  }

  const result = features.map((featureLine, index) => {
    const feature = featureLine.GeoObject;
    const meta = feature.metaDataProperty.GeocoderMetaData;
    const AA = get(meta,'AddressDetails');
    const country = get(AA,'Country');
    const AdministrativeArea = get(country,'AdministrativeArea');
    const SUB = get(AdministrativeArea,'SubAdministrativeArea');
    const locality = get(SUB || AdministrativeArea,'Locality');
    const Thoroughfare = get(locality || SUB || AdministrativeArea,'Thoroughfare');
    return {
      id: index,
      point: feature.Point.pos.split(' ').map(Number),
      text: meta.text || (feature.name + ', ' + feature.description),
      addressDetails: {
        country: {
          name: get(country, 'CountryName'),
          code: get(country, 'CountryNameCode'),
        },
        region: {
          name: get(AdministrativeArea, 'AdministrativeAreaName'),
        },
        locality: {
          name: get(locality, 'LocalityName'),
        },
        street: {
          name: get(Thoroughfare, 'ThoroughfareName'),
          house: get(Thoroughfare, 'Premise.PremiseNumber'),
        },
        postalcode: get(Thoroughfare, 'Premise.PostalCode.PostalCodeNumber')
      }
    }
  });

  if(focus){
    return sortResults(features, focus);
  }else{
    return result;
  }
};

const yandex = {
  search: (name, options = {}) => {
    return request(name, options.focus);
  },

  getDetails(A) {
    return Promise.resolve(A)
  },

  getBadge: () => 'powered by © Yandex'
};

export default yandex;