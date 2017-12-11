export const findCountry = (country, list = {}) => {
  const select = Object.keys(list).filter(iso => (list[iso].name === country));
  if (select.length) {
    return {
      name: country,
      code: select[0]
    }
  }
  return {
    name: country
  }
};

export const findRegion = (regionName, country, list = {}) => {
  if (country) {
    const select = ((list[country.code] || {}).regions || [])
      .filter(region=> (region.name === regionName || region.iso === regionName));

    if (select.length) {
      return {
        name: regionName,
        code: select[0].iso
      }
    }
  }
  return {
    name: regionName
  }
};