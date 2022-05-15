import { receiveError, logged } from './actions';

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
