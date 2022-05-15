import React from 'react';

import ArticlesHeader from '../ArticlesHeader/ArticlesHeader';
import styles from '../../index.module.scss';

const MiniArticle = (props) => {
  return (
    <li className={styles.article}>
      <ArticlesHeader {...props} />
      <p className={styles['article-content']}>{props.description}</p>
    </li>
  );
};

export default MiniArticle;
