export default (options = {}, countrySet) => {
  const location = [];
  const {country, region, city} = options;
  if (country) {
    const isoCountry = countrySet[country];

    if (isoCountry) {
      location.push(isoCountry.name);
      if (region) {
        const isoRegion = isoCountry.regions[region];
        if (isoRegion) {
          location.push(isoRegion['name']);
        } else {
          location.push(region);
        }
      }
    } else {
      location.push(country);
      if (region) {
        location.push(region);
      }
    }

    if (city) {
      location.push(city);
    }
  }

  if (location) {
    location.push('');
  }

  return location.reverse().join(', ');
}