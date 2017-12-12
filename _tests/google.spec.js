import google, { configure } from '../src/vendor/google';
import world from 'iso3166-2-db/i18n/dispute/UN/en';

// apikey from google examples :D
  const apiKey = 'AIzaSyDIJ9XX2ZvRKCJcFRrl-lRanEtFUow4piM';

describe("vendor google", () => {
  it('should throw without configuration', () => {
    expect(()=>google.search("something")).toThrow();
  });

  it('should search', async () => {
    configure(apiKey);
    return google
      .search('350 5th Ave, New York, NY 10118, USA')
      .then(results => {
        expect(results).not.toHaveLength(0);
        return google
          .getDetails(results[0])
          .then(line => {
            console.log(line);
            expect(Math.floor(line.point[0])).toEqual(-74);
            expect(Math.floor(line.point[1])).toEqual(40);
            expect(line.addressDetails.country.code).toEqual('US');
            expect(line.addressDetails.region.code).toEqual('NY');
            expect(line.addressDetails.locality.name).toEqual('New York');
            expect(line.addressDetails.postalcode).toEqual("10118");
          })
      });
  });
})