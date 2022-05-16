export function getError(state = false, action) {
  switch (action.type) {
    case 'ERROR':
      return action.err;
    default:
      return state;
  }
}
