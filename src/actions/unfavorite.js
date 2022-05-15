import { receiveError, fetchArticles, fetchOneArticle } from './actions';

export const unfavorite = (slug, token, pageNumber, flag) => {
  return function (dispatch) {
    return fetch(`https://kata.academy:8021/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.errors) {
          return dispatch(receiveError(json.errors));
        }
        if (flag) {
          return dispatch(fetchOneArticle(slug, token));
        }
        return dispatch(fetchArticles((pageNumber - 1) * 10, token));
      });
  };
};
