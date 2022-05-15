import { receiveError } from './receiveError';
import { setNewArticle } from './setNewArticle';

export const deleteArticle = (slug, token) => {
  return function (dispatch) {
    return fetch(`https://kata.academy:8021/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }).then((json) => {
      if (json.errors) {
        return dispatch(receiveError(json.errors));
      }
      dispatch(receiveError(false));
      return dispatch(setNewArticle(true));
    });
  };
};
