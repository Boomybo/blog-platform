export const logged = (json) => {
  return {
    type: 'LOGGED',
    json,
  };
};
