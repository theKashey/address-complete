const vsub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const vdist = (a, b) => {
  const v = vsub(a, b);
  return Math.sqrt((v[0] * v[0]) + (v[1] * v[1]));
};

export const distanceSort = (basePoint) => (a, b) => (
  vdist(a.point, basePoint) < vdist(b.point, basePoint)
);

export const sortResults = (features, focusPount) =>
  features
    .sort(distanceSort)
    .map((a, index) => ({...a, id: index}));