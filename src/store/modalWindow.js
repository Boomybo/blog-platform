export function modalWindow(state = false, action) {
  switch (action.type) {
    case 'MODAL':
      return action.bool;
    default:
      return state;
  }
}
