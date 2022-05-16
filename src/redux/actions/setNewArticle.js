export const setNewArticle = (bool) => {
  return {
    type: 'SET_NEW_ARTICLE',
    newArticle: bool,
  };
};
