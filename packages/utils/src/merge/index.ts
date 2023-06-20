/* eslint-disable prefer-rest-params */

/**
 * 用于合并 n 个对象
 * @param  {any[]} ...rest
 * @returns T
 */
const merge = <T>(...rest: any[]): T => {
  const obj = {};
  const il = rest.length;
  let key;
  let i = 0;
  for (; i < il; i += 1) {
    // eslint-disable-next-line no-restricted-syntax
    for (key in rest[i]) {
      if (rest[i].hasOwnProperty(key)) {
        if (
          typeof obj[key] === 'object' &&
          typeof rest[i][key] === 'object' &&
          obj[key] !== undefined &&
          obj[key] !== null &&
          !Array.isArray(obj[key]) &&
          !Array.isArray(rest[i][key])
        ) {
          obj[key] = {
            ...obj[key],
            ...rest[i][key],
          };
        } else {
          obj[key] = rest[i][key];
        }
      }
    }
  }
  return obj as T;
};

/**
 * 深度合并n个对象
 * @param  {any[]} ...objects
 * @returns T
 */
const deepMerge = <T>(...objects: any[]): T => {
  return objects.reduce((left, right) => {
    Object.keys(right).forEach((key) => {
      const lv = left[key];
      const rv = right[key];

      if (Array.isArray(lv) && Array.isArray(rv)) {
        left[key] = lv.concat(...rv);
      } else if (lv && typeof lv === 'object' && rv && typeof rv === 'object') {
        left[key] = deepMerge(lv, rv);
      } else {
        left[key] = rv;
      }
    });
    return left;
  }, {}) as T;
};

export { merge, deepMerge };
