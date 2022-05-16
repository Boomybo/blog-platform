export const receivedOneArticle = (article) => {
  return {
    type: 'RECEIVED_ARTICLE',
    article,
  };
};
