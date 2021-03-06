import { SET_TOTAL_PAGES } from '../actionTypes';

export const setTotalPages = (number) => {
  return {
    type: SET_TOTAL_PAGES,
    number: Math.round(number / 10) * 10,
  };
};
