import { LOGGED } from '../actionTypes';

export const logged = (json) => {
  return {
    type: LOGGED,
    json,
  };
};
