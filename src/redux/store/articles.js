export function articles(state = [], action) {
  switch (action.type) {
    case 'RECEIVED_ARTICLES':
      return [...action.articles];
    case 'FAVORITED_ARTICLES':
      return [...action.articles];
    default:
      return state;
  }
}
