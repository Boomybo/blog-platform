import { loading, receivedArticles, setTotalPages, receiveError } from './actions';

export const fetchArticles = (offset, token) => {
  return function (dispatch) {
    dispatch(loading(true));
    return fetch(`https://kata.academy:8021/api/articles?limit=10&offset=${offset}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(receivedArticles(json.articles));
        dispatch(setTotalPages(json.articlesCount));
        dispatch(loading(false));
      })
      .catch((err) => dispatch(receiveError(err)));
  };
};
