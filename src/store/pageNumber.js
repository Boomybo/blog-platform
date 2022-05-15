export function pageNumber(state = 1, action) {
  switch (action.type) {
    case 'SET_PAGE_NUMBER':
      return action.num;
    default:
      return state;
  }
}
