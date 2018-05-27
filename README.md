# address-complete

[![Greenkeeper badge](https://badges.greenkeeper.io/theKashey/address-complete.svg)](https://greenkeeper.io/)

What are you looking for? Or __how__?

Address-complete provide unified way to perform address autocomplete using 3 geo-data providers:
1. Google autocomplete + places API
2. MapZen (Pelias) autocomplete API
3. Yandex Geocoder

This library provides both basic address autocompete features,
 and extended address details extraction to enable complex forms to shine.

## Setup
``
npm install address-autocomplete
``
## API
 %provider_name%.search(term): Promise<Address>
 %provider_name%.getDetails(term): Promise<DetailedAddress>

### MAPZEN all the things.
Nor google, nor yandex __will NOT work in browser__ due to CORS limitations.

Use mapzen instead.

## Example

there is live example at codesandbox - https://codesandbox.io/s/y382k7n61j

```typescript
import mapzen, {configure} from 'address-autocomplete/mapzen';
import google, {configure} from 'address-autocomplete/google';
import yandex, {configure} from 'address-autocomplete/yandex';

// Google and MapZen does require an API key;
configure('YOUR_API_KEY');

mapzen
.search('something')
.then(autocompletedData => async {
  // array of objects with .text field
  const fullData = await Promise.all(autocompletedData.map(mapzen.getDetails));
  // array of object with coordinates as AddressDetails data
})
```

PS: To say they truth - you have to call getDetails __only__ for Google API. All other API just mimic Google's behavior.

```js
mapzen
.search('something')
.then(fullData => {
  // hooray! I've already got everything!
})
```

```js
google
.search('something')
.then(fullData => {
  // only fullData[0].text
  // noooo :( :(
})
```

## Types
This library comes with TS and Flow definition, but anyway

Response from Google.search is AddressResponse
```typescript
interface AddressResponse {
    id: number,
    text: string,
}
```

Response and any other API, or from `google.getDetails`
```typescript
interface DetailedAddressResponse extends AddressResponse {
    point: number[],
    addressDetails: {
        country: {
            name: string,
            code?: string  // as iso3166-1
        },
        region: {
            name: string,
            code?: string, // as iso3166-2
        },
        locality: {
            name: string
        },
        street: {
            name: string,
            house: string,
            label: string,
        },
        postalcode: string
    }
}
```
## Country list
Hey! How to get list of countries or list of states for a country?

Just use [iso3166-2-db](https://github.com/esosedi/3166)
```js
import listOfCountries from 'iso3166-2-db/countryList/UN/en';
```

address complete uses iso3166-2-db to extract iso3166-2 regions names from MapZen answers.

## Which API to use?
I could recommend:
- MapZen - it is almost free, and high quality.
- Google is a standard defacto.
- Yandex, for Europe.


## License
MIT