import defaultConfig from './config';
import {distanceSort, sortResults} from "../../util/vector";
import ISO3TOISO2 from 'iso3166-2-db/mapping/ISO3TO2';
import woff2iso from 'iso3166-2-db/mapping/woff2iso'
import getLocation from "../../util/getLocation";

const getGid = (str) => (str ? str.split(':')[2] : undefined);

const formatResponse = (json, focus) => {
  let features = json.features;

  if (!json || !json.features || !json.features.length || !json.geocoding) {
    throw new Error('empty result');
  }

  const result = features.map((feature, index) => {
    const props = feature.properties;
    return {
      id: index,
      point: feature.geometry.coordinates,
      text: props.label,

      addressDetails: {
        country: {
          name: props.country,
          code: ISO3TOISO2[props.country_a]
        },
        region: {
          name: props.region,
          code: props.region_a || woff2iso[getGid(props.region_gid)]
        },
        locality: {
          name: props.locality
        },
        street: {
          name: props.street,
          house: props.house,
          label: props.name
        },
        postalcode: props.postalcode
      }
    };
  });

  if (focus) {
    return sortResults(features, focus);
  } else {
    return result;
  }
};


let config = 0;

export const configure = (apiKey, _, settings = {}) => {
  config = {...defaultConfig, ...settings, apikey: apiKey}
};

const request = (text, location, focus) => {
  if (!config) {
    throw new Error('address-complete: Please configure your MapZen provider first')
  }

  const more = focus ? `&focus.point.lat=${focus[0]}&focus.point.lon=${focus[1]}` : '';
  return config
    .request(`${config.searchAPI}&api_key=${config.apikey}&text=${encodeURIComponent(text + location)}${more}`)
    .then(json => formatResponse(json, focus));
};


const MapZen = {
  search(name, options = {}) {
    return request(name, getLocation(options), options.focus)
  },

  getDetails(A) {
    return Promise.resolve(A)
  },

  getBadge() {
    return 'powered by © Mapzen';
  }
};

export default MapZen;