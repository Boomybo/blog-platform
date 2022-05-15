import { receiveError, setNewArticle } from './actions';

export const postArticle = (data, token) => {
  const tagArray = data.tag.filter((val) => val.oneTag).map((val) => val.oneTag);
  return function (dispatch) {
    return fetch('https://kata.academy:8021/api/articles', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        article: {
          title: data.title,
          description: data.description,
          body: data.text,
          tagList: tagArray,
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          return dispatch(receiveError(json.errors));
        }
        dispatch(receiveError(false));
        return dispatch(setNewArticle(true));
      });
  };
};
