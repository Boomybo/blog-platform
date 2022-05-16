import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from '../Forms/Forms.module.scss';
import * as actions from '../../redux/actions/actions';

const SignUp = ({ postNewUser, loggedState, getError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  if (loggedState.isLogged) {
    return <Redirect to="/"></Redirect>;
  }

  const disabled =
    watch('username') && watch('email') && watch('password') && watch('passwordRepeat') && watch('allow')
      ? true
      : false;

  return (
    <div className={styles['form-container']}>
      <form className={styles.form} onSubmit={handleSubmit(postNewUser)}>
        <h3 className={styles['form-header']}>Create new Account</h3>
        <label className={styles['form-label']}>
          Username
          <input
            type="text"
            placeholder="username"
            name="username"
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
          Password
          <input
            type="password"
            name="password"
            className={errors.password ? classNames(styles['form-input'], styles.red) : styles['form-input']}
            {...register('password', {
              required: 'error message',
              minLength: {
                value: 6,
                message: 'Password must have at least 6 symbols',
              },
              maxLength: {
                value: 40,
                message: 'Password must have maximum 40 symbols',
              },
            })}
            placeholder="Password"
          />
          {errors.password && <span className={styles.required}>{errors.password.message}</span>}
        </label>

        <label className={styles['form-label']}>
          {' '}
          Repeat Password
          <input
            type="password"
            name="password-repeat"
            className={errors.passwordRepeat ? classNames(styles['form-input'], styles.red) : styles['form-input']}
            {...register('passwordRepeat', {
              required: 'error message',
              validate: (val) => {
                if (watch('password') !== val) {
                  return 'Passwords doesnt match';
                }
              },
            })}
            placeholder="Repeat password"
          />
          {errors.passwordRepeat && <span className={styles.required}>Passwords must match</span>}
        </label>
        <label
          className={
            errors.allow
              ? classNames(styles['form-label'], styles['form-label-checkbox'], styles['form-label-checkbox--req'])
              : classNames(styles['form-label'], styles['form-label-checkbox'])
          }
        >
          <input
            type="checkbox"
            className={styles['form-agreement']}
            {...register('allow', { required: 'allow is required' })}
          />
          <span className={styles['form-agreement__check-box']}></span>I agree to the processing of my personal
          information
        </label>
        <button type="submit" className={styles['form-submit-btn']} disabled={!disabled}>
          Create
        </button>
        <p className={styles['form-note']}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(SignUp);
