import defaultConfig from './config';
import {findCountry, findRegion} from "../../util/findByName";
import getLocation from "../../util/getLocation";
import {distanceSort, sortResults} from "../../util/vector";

let config = 0;

const formatResponse = (json, focus) => {
  if (!json || !json.predictions || !json.predictions.length) {
    throw new Error('empty result');
  }

  let features = json.predictions;

  return features.map((feature, index) => {
    return {
      id: index,
      text: feature.description,
      google_placeId: feature.place_id,
      // addressDetails: {
      //   country,
      //   region: findRegion(feature.terms, country, config.countries)
      // }
    }
  });

  if (focus) {
    return sortResults(features, focus);
  } else {
    return result;
  }
};

const LLtoNumber = ll => [ll.lng, ll.lat];

const getDetails = (object) => {
  return config
    .request(`${config.detailAPI}&place_id=${object.google_placeId}&key=${config.apikey}`)
    .then(({result}) => {
      const get = (key) => {
        const list = result.address_components;
        const line = list.filter(item => item.types.indexOf(key) >= 0);
        return line[0] || {};
      };
      return {
        ...object,
        point: result.geometry ? LLtoNumber(result.geometry.location) : [],
        addressDetails: {
          country: {
            name: get('country').long_name,
            code: get('country').short_name
          },
          region: {
            name: get('administrative_area_level_1').long_name,
            code: get('administrative_area_level_1').short_name
            //findRegion(get('administrative_area_level_1').short_name || object.addressDetails.region.name, object.addressDetails.country, config.countries)
          },
          street: {
            name: get('route').long_name,
            house: get('street_number').long_name,
            label: get('country').long_name,
          },
          locality: {
            name: get('locality').long_name
          },
          postalcode: get('postal_code').long_name
        }
      }

    });
};

export const configure = (apiKey, countries = {}, settings = {}) => {
  config = {...defaultConfig, ...settings, apikey: apiKey, countries}
};

const request = (name, location, focus) => {
  if (!config) {
    throw new Error('address-complete: Please configure your Google provider first')
  }

  const more = focus ? `&location=${focus[0]},${focus[1]}` : '';
  const offset = name.length;
  const text = name + (location ? `,${location}` : '');

  return config
    .request(`${config.placesAPI}&offset=${offset}&input=${encodeURIComponent(text)}&types=geocode${more}&key=${config.apikey}`)
    .then(json => formatResponse(json, focus));
};

const google = {
  search: (name, options = {}) => {
    return request(name, getLocation(options), options.focus);
  },

  getDetails: (A) => getDetails(A),

  getBadge: () => 'powered by © Google'

};

export default google;