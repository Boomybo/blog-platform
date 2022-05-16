import { combineReducers } from 'redux';

import { articles } from './articles';
import { getError } from './getError';
import { oneArticle } from './oneArticle';
import { pageNumber } from './pageNumber';
import { totalPages } from './totalPages';
import { loader } from './loader';
import { loggedState } from './loggedState';
import { newArticle } from './newArticle';
import { modalWindow } from './modalWindow';

const rootReducer = combineReducers({
  articles,
  getError,
  pageNumber,
  totalPages,
  loader,
  oneArticle,
  loggedState,
  newArticle,
  modalWindow,
});

export default rootReducer;
