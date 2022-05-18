import { SET_NEW_ARTICLE } from '../actionTypes';

export const setNewArticle = (bool) => {
  return {
    type: SET_NEW_ARTICLE,
    newArticle: bool,
  };
};
