import { SET_PAGE_NUMBER } from '../actionTypes';

export const setPageNumber = (num) => {
  return {
    type: SET_PAGE_NUMBER,
    num,
  };
};
