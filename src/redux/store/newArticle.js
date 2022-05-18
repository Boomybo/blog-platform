import { SET_NEW_ARTICLE } from '../actionTypes';

export function newArticle(state = false, action) {
  switch (action.type) {
    case SET_NEW_ARTICLE:
      return action.newArticle;
    default:
      return state;
  }
}
