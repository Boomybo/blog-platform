import { RECEIVED_ARTICLE } from '../actionTypes';

export const receivedOneArticle = (article) => {
  return {
    type: RECEIVED_ARTICLE,
    article,
  };
};
