import {
  receiveError,
  setNewArticle,
  loading,
  receivedArticles,
  setTotalPages,
  receivedOneArticle,
  logged,
} from '../actions';

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

export const favorite = (slug, token, pageNumber, flag) => {
  return function (dispatch) {
    return fetch(`https://kata.academy:8021/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          return dispatch(receiveError(json.errors));
        }
        if (flag) {
          return dispatch(fetchOneArticle(slug, token));
        }
        dispatch(receiveError(false));
        return dispatch(fetchArticles((pageNumber - 1) * 10, token));
      });
  };
};

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

export const postExitingUser = (data) => {
  return function (dispatch) {
    return fetch('https://kata.academy:8021/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          email: data.email,
          password: data.password,
        },
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.errors) {
          return dispatch(receiveError(json.errors));
        }
        dispatch(receiveError(false));
        return dispatch(logged(json.user));
      })
      .catch((err) => dispatch(receiveError(err)));
  };
};

export const postNewUser = (data) => {
  return function (dispatch) {
    return fetch('https://kata.academy:8021/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.errors) {
          return dispatch(receiveError(json.errors));
        }
        dispatch(receiveError(false));
        return dispatch(logged(json.user));
      })
      .catch((err) => dispatch(receiveError(err)));
  };
};

export const postUpdate = (data, token) => {
  return function (dispatch) {
    return fetch('https://kata.academy:8021/api/user', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          email: data.email,
          token: token,
          username: data.username,
          bio: '',
          image: data.avatar,
        },
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.errors) {
          return dispatch(receiveError(json.errors));
        }
        dispatch(receiveError(false));
        return dispatch(logged(json.user));
      })
      .catch((err) => dispatch(receiveError(err)));
  };
};

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
