import { LOGGED, UNLOGGED } from '../actionTypes';

const login = {
  isLogged: false,
};

export function loggedState(state = login, action) {
  switch (action.type) {
    case LOGGED:
      return { ...state, isLogged: true, data: action.json };
    case UNLOGGED:
      return { isLogged: false };
    default:
      return state;
  }
}
