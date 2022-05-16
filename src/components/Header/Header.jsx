import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as actions from '../../redux/actions/actions';

import styles from './Header.module.scss';

const Header = ({
  loggedState,
  unlogged,
  receiveError,
  fetchArticles,
  deleteOneArticle,
  oneArticle,
  fetchOneArticle,
}) => {
  const token = loggedState.data && loggedState.data.token;

  const headerIsLogged = loggedState.isLogged ? (
    <ProfileBtns
      unlogged={unlogged}
      receiveError={receiveError}
      fetchArticles={fetchArticles}
      loggedState={loggedState}
      fetchOneArticle={fetchOneArticle}
      slug={oneArticle.slug}
    />
  ) : (
    <SignInSignUpBtns />
  );
  return (
    <header className={styles.header}>
      <Link to="/">
        {' '}
        <button
          className={styles['logo-btn']}
          onClick={() => {
            fetchArticles(0, token);
            deleteOneArticle(false);
          }}
        >
          <h2 className={styles['blog-title']}>Realworld Blog</h2>
        </button>
      </Link>
      <div className={styles['header-buttons']}>{headerIsLogged}</div>
    </header>
  );
};

const SignInSignUpBtns = () => {
  return (
    <React.Fragment>
      <Link to="/sign-in">
        <button className={classNames(styles['header-btn'], styles['sign-in'])}>Sign In</button>
      </Link>
      <Link to="/sign-up">
        <button className={classNames(styles['header-btn'], styles['sign-up'])}>Sign Up</button>
      </Link>
    </React.Fragment>
  );
};

const ProfileBtns = ({ unlogged, receiveError, fetchArticles, loggedState, slug, fetchOneArticle }) => {
  return (
    <div className={styles['profile-btns']}>
      <Link to="/new-article">
        <button className={classNames(styles['header-btn '], styles['create-article'])}>Create Article</button>
      </Link>
      <Link to="/profile">
        <button className={styles['profile-username-icon']}>
          <p className={styles['header-username']}>{loggedState.data.username}</p>
          <img src={loggedState.data.image} className={styles['header-username-icon']}></img>
        </button>
      </Link>
      <button
        className={classNames(styles['header-btn'], styles['log-out'])}
        onClick={() => {
          localStorage.clear();
          unlogged();
          fetchArticles();
          fetchOneArticle(slug);
          receiveError(false);
        }}
      >
        Log Out
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(Header);
