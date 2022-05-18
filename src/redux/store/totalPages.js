import { SET_TOTAL_PAGES } from '../actionTypes';

export function totalPages(state = 0, action) {
  switch (action.type) {
    case SET_TOTAL_PAGES:
      return action.number;
    default:
      return state;
  }
}
