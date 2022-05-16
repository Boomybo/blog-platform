import { loading } from './loading';
import { logged } from './logged';
import { receivedArticles } from './receivedArticles';
import { receivedOneArticle } from './receivedOneArticle';
import { receiveError } from './receiveError';
import { setModalWindow } from './setModalWindow';
import { setNewArticle } from './setNewArticle';
import { setPageNumber } from './setPageNumber';
import { setTotalPages } from './setTotalPage';
import { unlogged } from './unlogged';
import { deleteOneArticle } from './deleteOneArticle';
import {
  deleteArticle,
  favorite,
  fetchArticles,
  fetchOneArticle,
  postArticle,
  postExitingUser,
  postNewUser,
  postUpdate,
  unfavorite,
  updateArticle,
} from './api/fetchRequest';

export {
  receivedArticles,
  receivedOneArticle,
  deleteArticle,
  receiveError,
  loading,
  setPageNumber,
  setTotalPages,
  logged,
  unlogged,
  setModalWindow,
  setNewArticle,
  fetchArticles,
  fetchOneArticle,
  postNewUser,
  postExitingUser,
  postUpdate,
  postArticle,
  updateArticle,
  favorite,
  unfavorite,
  deleteOneArticle,
};
