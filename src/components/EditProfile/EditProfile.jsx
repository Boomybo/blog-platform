import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';

import * as actions from '../../actions/actions';
import styles from '../Forms/Forms.module.scss';

const EditProfile = ({ postUpdate, loggedState, getError }) => {
  const username = loggedState.data ? loggedState.data.username : null;
  const email = loggedState.data ? loggedState.data.email : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: username,
      email: email,
    },
  });

  if (!loggedState.isLogged) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div className={styles['form-container']}>
      <form className={styles.form} onSubmit={handleSubmit((data) => postUpdate(data, loggedState.data.token))}>
        <h3 className={styles['form-header']}>Edit Profile</h3>
        <label className={styles['form-label']}>
          Username
          <input
            type="text"
            placeholder="username"
            name="username"
            ref={register}
            className={
              errors.username || getError.username ? classNames(styles['form-input'], styles.red) : styles['form-input']
            }
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'At least 3',
              },
              maxLength: {
                value: 20,
                message: 'Up to 20',
              },
              pattern: {
                value: /^[a-z0-9]{3,20}$/gim,
                message: 'invalid username',
              },
            })}
          />
          {errors.username && <span className={styles.required}>{errors.username.message}</span>}
          {getError.username && <span className={styles.required}>Username {getError.username}</span>}
        </label>

        <label className={styles['form-label']}>
          Email address
          <input
            type="text"
            placeholder="Email address"
            name="email"
            className={
              errors.email || getError.email ? classNames(styles['form-input'], styles.red) : styles['form-input']
            }
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
          />
          {errors.email && <span className={styles.required}>{errors.email.message}</span>}
          {getError.email && <span className={styles.required}>Email {getError.email}</span>}
        </label>

        <label className={styles['form-label']}>
          {' '}
          New password
          <input
            type="password"
            name="newPassword"
            className={errors.newPassword ? classNames(styles['form-input'], styles.red) : styles['form-input']}
            {...register('newPassword', {
              required: false,
              minLength: {
                value: 6,
                message: 'Password must have at least 6 symbols',
              },
              maxLength: {
                value: 40,
                message: 'Password must have maximum 40 symbols',
              },
            })}
            placeholder="New Password"
          />
          {errors.newPassword && <span className={styles.required}>{errors.newPassword.message}</span>}
        </label>

        <label className={styles['form-label']}>
          {' '}
          Avatar image (url)
          <input
            type="text"
            name="avatar"
            className={errors.avatar ? classNames(styles['form-input'], styles.red) : styles['form-input']}
            {...register('avatar', {
              required: false,
              pattern: {
                value:
                  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
                message: 'invalid url',
              },
            })}
            placeholder="avatar image"
          />
          {errors.avatar && <span className={styles.required}></span>}
        </label>

        <button type="submit" className={styles['form-submit-btn']}>
          Save
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(EditProfile);
