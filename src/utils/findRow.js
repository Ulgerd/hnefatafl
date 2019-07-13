import { rows } from '../data/gameConditions.js';

export const findRow = (id) => {
  let row;
  rows.map((delta) => {
    if (id >= delta[0] && id <= delta[1]) {
      return row = delta;
    }
    return null;
  })
  return row;
}
