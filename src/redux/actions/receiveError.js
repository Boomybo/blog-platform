export const receiveError = (err) => {
  return {
    type: 'ERROR',
    err,
  };
};
