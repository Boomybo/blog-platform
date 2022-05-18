import { RECEIVED_ARTICLE, DELETE_ONE_ARTICLE } from '../actionTypes';

export function oneArticle(state = false, action) {
  switch (action.type) {
    case RECEIVED_ARTICLE:
      return action.article;
    case DELETE_ONE_ARTICLE:
      return false;
    default:
      return state;
  }
}
