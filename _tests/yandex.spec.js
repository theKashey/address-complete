import yandex, {configure} from '../src/vendor/yandex';
import world from 'iso3166-2-db/i18n/dispute/UN/en';

describe("vendor yandex", () => {
  it('should not throw without configuration', () => {
    expect(() => yandex.search("119021, Москва, ул. Льва Толстого, 16")).not.toThrow();
  });

  it('should search', () => {
    return yandex
    // Yandex office
      .search('119021, Москва, ул. Льва Толстого, 16')
      .then(results => {
        expect(results).toHaveLength(1);
        return yandex
          .getDetails(results[0])
          .then(line => {
            console.log(line);
            expect(Math.floor(line.point[0])).toEqual(37);
            expect(Math.floor(line.point[1])).toEqual(55);
            expect(line.addressDetails.country.code).toEqual('RU');
            expect(line.addressDetails.region.name).toEqual('Moscow');
            expect(line.addressDetails.locality.name).toEqual('Moscow');
            expect(line.addressDetails.postalcode).toEqual("119021");
          })
      });
  });
})