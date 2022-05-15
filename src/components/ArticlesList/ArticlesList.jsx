import React from 'react';
import { Pagination, Spin } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../actions/actions';
import MiniArticle from '../MiniArticle/MiniArticle';
import styles from '../../index.module.scss';

const ArticlesList = ({
  articles,
  pageNumber,
  totalPages,
  setPageNumber,
  fetchArticles,
  loader,
  history,
  loggedState,
}) => {
  const token = loggedState.data ? loggedState.data.token : null;

  const visibleArticles = articles.map((element) => {
    return (
      <MiniArticle
        authorInfo={element.author}
        body={element.body}
        createdAt={element.createdAt}
        description={element.description}
        favorited={element.favorited}
        favoritesCount={element.favoritesCount}
        tagList={element.tagList}
        title={element.title}
        updatedAt={element.updatedAt}
        key={element.slug}
        slug={element.slug}
        onItemSelected={(slug) => history.push(slug)}
        pageNumber={pageNumber}
      />
    );
  });

  const content = (
    <main className={styles.main}>
      <section className={styles.articles}>
        <ul>{visibleArticles}</ul>
      </section>
      <footer className={styles.footer}>
        <Pagination
          defaultCurrent={1}
          current={pageNumber}
          total={totalPages}
          onChange={(number) => {
            setPageNumber(number);
            return fetchArticles((number - 1) * 10, token);
          }}
        />
      </footer>
    </main>
  );

  const isLoading = loader ? <Spin size="large" className="spin" /> : content;

  return <div className={styles['content-container']}>{isLoading}</div>;
};

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, actions)(ArticlesList));
