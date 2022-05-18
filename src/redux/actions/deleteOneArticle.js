import { DELETE_ONE_ARTICLE } from '../actionTypes';

export const deleteOneArticle = (obj) => {
  return {
    type: DELETE_ONE_ARTICLE,
    obj: obj,
  };
};
