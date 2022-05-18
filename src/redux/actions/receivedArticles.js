import { RECEIVED_ARTICLES } from '../actionTypes';

export const receivedArticles = (articles) => {
  return {
    type: RECEIVED_ARTICLES,
    articles,
  };
};
