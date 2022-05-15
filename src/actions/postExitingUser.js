import { receiveError, logged } from './actions';

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
