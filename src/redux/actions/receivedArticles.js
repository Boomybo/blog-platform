export const receivedArticles = (articles) => {
  return {
    type: 'RECEIVED_ARTICLES',
    articles,
  };
};
