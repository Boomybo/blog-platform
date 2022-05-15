import { receivedOneArticle, loading, receiveError } from './actions';

export const fetchOneArticle = (slug, token) => {
  return function (dispatch) {
    dispatch(loading(true));
    return fetch(`https://kata.academy:8021/api/articles/${slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(receivedOneArticle(json.article));
        dispatch(loading(false));
      })
      .catch((err) => dispatch(receiveError(err)));
  };
};
