export const deleteOneArticle = (obj) => {
  console.log(obj);
  return {
    type: 'DELETE_ONE_ARTICLE',
    obj: obj,
  };
};
