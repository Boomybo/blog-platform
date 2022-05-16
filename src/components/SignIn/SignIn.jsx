import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { useEffect } from 'react';
import classNames from 'classnames';

import styles from '../Forms/Forms.module.scss';
import * as actions from '../../redux/actions/actions';

const SignIn = ({ getError, postExitingUser, loggedState, fetchArticles }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (loggedState.isLogged) {
      fetchArticles(0, loggedState.data.token);
    }
  });

  if (loggedState.isLogged) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div className={styles['form-container']}>
      <form className={styles.form} onSubmit={handleSubmit(postExitingUser)}>
        <h3 className={styles['form-header']}>Sign In</h3>
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
        </label>

        <label className={styles['form-label']}>
          {' '}
          Password
          <input
            type="password"
            name="password"
            className={errors.password ? classNames(styles['form-input'], styles.red) : styles['form-input']}
            {...register('password', { required: 'Password is required' })}
            placeholder="Password"
          />
          {errors.password && <span className={styles.required}>{errors.password.message}</span>}
        </label>
        {getError['email or password'] && (
          <span className={styles.required}>Username or password {getError['email or password']}</span>
        )}
        <button type="submit" className={styles['form-submit-btn']}>
          Login
        </button>
        <p className={styles['form-note']}>
          Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(SignIn);
