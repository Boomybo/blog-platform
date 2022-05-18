import { MODAL } from '../actionTypes';

export const setModalWindow = (bool) => {
  return {
    type: MODAL,
    bool,
  };
};
