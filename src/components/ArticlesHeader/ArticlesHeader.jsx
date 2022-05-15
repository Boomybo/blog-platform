import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions/actions';

import styles from './ArticlesHeader.module.scss';

const ArticlesHeader = (props) => {
  const {
    title,
    authorInfo,
    createdAt,
    favorited,
    favoritesCount,
    tagList,
    fetchOneArticle,
    slug,
    onItemSelected,
    author,
    favorite,
    unfavorite,
    pageNumber,
    loggedState,
  } = props;

  const token = loggedState.data ? loggedState.data.token : null;

  const username = authorInfo ? authorInfo.username : author.username;

  const image = authorInfo ? authorInfo.image : author.image;

  const tags = () => {
    if (!tagList || tagList.length === 0) {
      return;
    } else {
      return tagList.map((tag, index) => {
        if (!tag) {
          return;
        }
        return (
          <button className={styles.tag} key={index}>
            {tag}
          </button>
        );
      });
    }
  };

  const onChange = (e) => {
    if (e.target.checked) {
      if (!authorInfo) {
        return favorite(slug, token, pageNumber, true);
      }
      return favorite(slug, token, pageNumber);
    } else if (!e.target.checked) {
      if (!authorInfo) {
        return unfavorite(slug, token, pageNumber, true);
      }
      return unfavorite(slug, token, pageNumber);
    }
  };

  return (
    <div className={styles['article-header']}>
      <div className={styles['article-title-container']}>
        <div className={styles['article-info']}>
          <Link
            to={{
              pathname: `/articles/${slug}`,
            }}
            className={styles['article-title']}
            onClick={() => {
              if (!author) {
                fetchOneArticle(slug, token);
                onItemSelected(slug);
              }
            }}
          >
            {title}
          </Link>
          <label className={styles['filter-label']}>
            <input
              type="checkbox"
              className={styles['article-header-label-input']}
              checked={favorited}
              onChange={onChange}
              onClick={(e) => !e.target.checked}
            />
            <span className={styles['check__box']}></span>
            {favoritesCount}
          </label>
          <div className={styles['like-counter']}></div>
        </div>
        <div className={styles.tags}>{tags()}</div>
      </div>
      <div className={styles['article-profile-info-container']}>
        <div className={styles['article-profile-info']}>
          <p className={styles['article-profile-name']}>{username}</p>
          <p className={styles['article-date']}>{format(new Date(createdAt), 'MMMM dd, yyyy')}</p>
        </div>
        <img src={image} alt="profile img" className={styles['article-profile-img']} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(ArticlesHeader);
