import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useFieldArray, useForm } from 'react-hook-form';
import { Redirect, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import * as actions from '../../redux/actions/actions';

import styles from './NewArticle.module.scss';

const NewArticle = ({
  loggedState,
  postArticle,
  newArticle,
  setNewArticle,
  fetchArticles,
  oneArticle,
  updateArticle,
}) => {
  const location = useLocation();
  let pathIncludesEdit = location.pathname.includes('edit');

  const defVal = pathIncludesEdit && oneArticle.tagList.map((val) => ({ oneTag: val }));

  const token = loggedState.isLogged && loggedState.data.token;

  const initial = pathIncludesEdit ? defVal : [{ oneTag: '' }];

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      tag: initial,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tag',
  });

  useEffect(() => {
    if (newArticle) {
      setNewArticle(false);
      fetchArticles(0, token);
    }
  });

  if (!loggedState.isLogged) {
    return <Redirect to="/sign-in"></Redirect>;
  }

  if (newArticle) {
    return <Redirect to="/" />;
  }

  const caption = pathIncludesEdit ? 'Edit Article' : 'Create new artile';
  const articleTitle = pathIncludesEdit ? oneArticle.title : null;
  const description = pathIncludesEdit ? oneArticle.description : null;
  const body = pathIncludesEdit ? oneArticle.body : null;

  const onSub = (data) => {
    if (pathIncludesEdit) {
      return updateArticle(oneArticle.slug, loggedState.data.token, data);
    }
    return postArticle(data, loggedState.data.token);
  };

  return (
    <div className={styles['new-article-container']}>
      <form className={styles['new-article-form']} onSubmit={handleSubmit(onSub)}>
        <h3 className={styles['new-article-header']}>{caption}</h3>
        <label className={styles['new-article-label']}>
          {' '}
          Title
          <input
            type="text"
            name="title"
            className={styles['new-article-input']}
            placeholder="Title"
            {...register('title', {
              required: 'Title is required',
              value: articleTitle,
            })}
          />
          {errors.title && <span className={styles.required}>{errors.title.message}</span>}
        </label>
        <label className={styles['new-article-label']}>
          {' '}
          Short description
          <input
            type="text"
            name="description"
            className={styles['new-article-input']}
            placeholder="Short description"
            {...register('description', {
              required: 'Description is required',
              value: description,
            })}
          />
          {errors.description && <span className={styles.required}>{errors.description.message}</span>}
        </label>
        <label className={styles['new-article-label']}>
          {' '}
          Text
          <textarea
            placeholder="text"
            rows={8}
            cols={105}
            className={styles['new-article-textarea']}
            {...register('text', {
              required: 'Text is required',
              value: body,
            })}
          ></textarea>
          {errors.text && <span className={styles.required}>{errors.text.message}</span>}
        </label>
        <p className={styles.tags}>Tags</p>

        <ul>
          {fields.map((item, index) => {
            if (index === fields.length - 1) {
              let disabled = index == fields.length - 1 ? true : false;
              return (
                <li key={item.id} className={styles.tags}>
                  <input {...register(`tag.${index}.oneTag`)} className={styles['new-article-input']} />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className={classNames(styles['tags-btn'], styles['tags-delete'])}
                    disabled={disabled}
                  >
                    Delete
                  </button>
                  <button
                    className={classNames(styles['tags-btn'], styles['tags-add'])}
                    type="button"
                    onClick={() => {
                      return append({ oneTag: '' });
                    }}
                  >
                    append
                  </button>
                </li>
              );
            }
            return (
              <li key={item.id} className={styles.tags}>
                <input
                  {...register(`tag.${index}.oneTag`)}
                  className={classNames(styles['new-article-input'], styles['one-tag'])}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className={classNames(styles['tags-btn'], styles['tags-delete'])}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
        <button className={styles['new-article-send']}>Send</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(NewArticle);
