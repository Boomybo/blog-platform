export function loader(state = true, action) {
  switch (action.type) {
    case 'LOADING':
      return action.loader;
    default:
      return state;
  }
}
