import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Spin } from 'antd';
import classNames from 'classnames';

import icon from '../../assets/images/Vector1.svg';
import * as actions from '../../redux/actions/actions';
import ArticlesHeader from '../ArticlesHeader';

import styles from './ArticlePage.module.scss';

const ArticlePage = ({
  oneArticle,
  loggedState,
  deleteArticle,
  setModalWindow,
  modalWindow,
  fetchArticles,
  newArticle,
  setNewArticle,
}) => {
  const token = loggedState.data && loggedState.data.token;
  const username = oneArticle && oneArticle.author.username;

  useEffect(() => {
    if (newArticle) {
      setNewArticle(false);
      fetchArticles(0, token);
    }
  });

  if (newArticle) {
    return <Redirect to="/" />;
  }

  const btns =
    loggedState.isLogged && loggedState.data.username === username ? (
      <AuthorBtns
        deleteArticle={deleteArticle}
        slug={oneArticle.slug}
        token={token}
        setModalWindow={setModalWindow}
        modalWindow={modalWindow}
      />
    ) : null;

  const content = !oneArticle ? (
    <div className={styles['content-container']}>
      <Spin size="large" className="spin" />{' '}
    </div>
  ) : (
    <div className={styles['article-page-container']}>
      <div className={styles['article-page']}>
        <ArticlesHeader {...oneArticle} />
        <div className={styles['author-desc']}>
          <p className={styles['article-description']}>{oneArticle.description}</p>
          {btns}
        </div>
        <div className={styles['article-body']}>
          <ReactMarkdown>{oneArticle.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
  return content;
};

const mapStateToProps = (state) => {
  return state;
};

const ModalWindow = ({ deleteArticle, slug, token, setModalWindow }) => {
  return (
    <div className={styles['modal-window']}>
      <div className={styles['modal-message']}>
        <img className={styles['modal-icon']} src={icon}></img>
        <p>Are you sure to delete this article?</p>
      </div>
      <div className={styles['modal-btns']}>
        <button
          className={classNames(styles['modal-btn'], styles['modal-btn-cancel'])}
          onClick={() => setModalWindow(false)}
        >
          No
        </button>
        <button
          className={classNames(styles['modal-btn'], styles['modal-btn-submit'])}
          onClick={() => {
            setModalWindow(false);
            deleteArticle(slug, token);
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

const AuthorBtns = (props) => {
  const { setModalWindow, slug, modalWindow } = props;
  return (
    <div className={styles['author-btns']}>
      <button className={classNames(styles['tags-btn'], styles['tags-delete'])} onClick={() => setModalWindow(true)}>
        Delete
      </button>
      {modalWindow && <ModalWindow {...props} />}
      <Link to={{ pathname: `/articles/${slug}/edit` }}>
        <button className={classNames(styles['tags-btn'], styles['edit'])}>Edit</button>
      </Link>
    </div>
  );
};

export default connect(mapStateToProps, actions)(ArticlePage, AuthorBtns);
