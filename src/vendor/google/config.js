import fetch from '../../util/fetch';

export default {
  apikey: '',
  placesAPI: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?',
  detailAPI: 'https://maps.googleapis.com/maps/api/place/details/json?',


  dataBase: {},
  // default request
  request: fetch
}
