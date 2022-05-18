import { LOADING } from '../actionTypes';

export const loading = (loader) => {
  return {
    type: LOADING,
    loader,
  };
};
