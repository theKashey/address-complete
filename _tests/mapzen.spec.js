import mapzen, {configure} from '../src/vendor/mapzen';
import world from 'iso3166-2-db/i18n/dispute/UN/en';

const apiKey = 'mapzen-fgHW3MX';//process.env.MAPZEN_APIKEY;

describe("vendor mapzen", () => {
  it('should throw without configuration', () => {
    expect(() => mapzen.search("something")).toThrow();
  });

  it('should search, even with states', async () => {
    configure(apiKey);
    return mapzen
      .search('350 5th Ave, New York, NY 10118, USA')
      .then(results => {
        expect(results).not.toHaveLength(0);
        return mapzen
          .getDetails(results[0])
          .then(line => {
            console.log(line);
            expect(Math.floor(line.point[0])).toEqual(-74);
            expect(Math.floor(line.point[1])).toEqual(40);
            expect(line.addressDetails.country.code).toEqual('US');
            expect(line.addressDetails.region.code).toEqual('NY');
            expect(line.addressDetails.locality.name).toEqual('New York');
            expect(line.addressDetails.postalcode).toEqual("10018");
          })
      });
  });
})