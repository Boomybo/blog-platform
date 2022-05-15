import { receiveError, setNewArticle } from './actions';

export const updateArticle = (slug, token, data) => {
  return function (dispatch) {
    return fetch(`https://kata.academy:8021/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        article: {
          title: data.title,
          description: data.description,
          body: data.text,
        },
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.errors) {
          return dispatch(receiveError(json.errors));
        }
        dispatch(receiveError(false));
        return dispatch(setNewArticle(true));
      })
      .catch((err) => dispatch(receiveError(err)));
  };
};
