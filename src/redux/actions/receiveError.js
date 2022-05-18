import { ERROR } from '../actionTypes';

export const receiveError = (err) => {
  return {
    type: ERROR,
    err,
  };
};
