/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  useLazyQuery,
  useMutation,
} from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { CREATE_USER, GET_USER } from '../../api/user';
import { Loader } from '../../components/Loader';
import { AppContext } from '../../context/AppContext';
import { Role } from '../../types/Role';
import './Login.scss';

export const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [hasAccount, setHasAccount] = useState(true);
  const [createRole, setCreacteRole] = useState<Role | string>('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<string>('');
  const { setAccessToken, setUserInfo, setRole } = useContext(AppContext);

  const [createUser, { error: createAccountError, loading: createLoading, data: response }] = useMutation(CREATE_USER);

  const [getUser] = useLazyQuery(GET_USER);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);

    if (hasAccount) {
      const { data, loading, error: logInError } = await getUser({
        variables: {
          name,
          password,
        },
      });

      setLoader(loading);

      if (logInError && logInError.graphQLErrors && logInError.graphQLErrors.length > 0) {
        const errorResponse = logInError.graphQLErrors[0].extensions?.response as { message: string };

        if (errorResponse) {
          setError(errorResponse.message);
        }

        setTimeout(() => {
          setError('');
        }, 3000);
      }

      if (data) {
        setUserInfo({
          id: data.login.id,
          name: data.login.name,
          role: data.login.role,
        });
        setPassword('');
        setName('');
        localStorage.setItem('accessToken', JSON.stringify(data.login.accessToken));
        localStorage.setItem('role', JSON.stringify(data.login.role));
        setAccessToken(data.login.accessToken);
        setRole(data.login.role);
      }

      return;
    }

    try {
      await createUser({
        variables: {
          name,
          role: createRole,
          password,
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(createLoading);

    if (createAccountError && createAccountError.graphQLErrors && createAccountError.graphQLErrors.length > 0) {
      const errorResponse = createAccountError.graphQLErrors[0].extensions?.response as { message: string };

      if (errorResponse) {
        setError(errorResponse.message);
      }

      setTimeout(() => {
        setError('');
      }, 3000);
    }

    if (response) {
      setUserInfo({
        id: response.createUser.id,
        name: response.createUser.name,
        role: response.createUser.role,
      });
      setPassword('');
      setName('');
      localStorage.setItem('accessToken', JSON.stringify(response.createUser.accessToken));
      localStorage.setItem('role', JSON.stringify(response.createUser.role));
      setAccessToken(response.createUser.accessToken);
      setRole(response.createUser.role);
    }
  }, [createAccountError, createLoading, response]);

  return (
    <div className="login">
      <form className="login__form" onSubmit={event => handleSubmit(event)}>
        <p className="login__title">{hasAccount ? 'Log in' : 'Sign up'}</p>
        {!hasAccount && <p className="login__create-text">(Creacte account)</p>}
        <div className="login__content">
          <label className="login__label">
            Name:
            <input
              type="text"
              className="login__input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          {!hasAccount && (
            <label className="login__label">
              Role:
              <select
                className="login__input"
                value={createRole}
                onChange={(event) => setCreacteRole(event.target.value)}
                required
              >
                <option value="" disabled>--</option>
                <option>{Role.ADMIN}</option>
                <option>{Role.FruitJohn}</option>
                <option>{Role.VegetarianMary}</option>
              </select>
            </label>
          )}
          <label className="login__label">
            Password:
            <input
              type="password"
              className="login__input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button
            className="login__send"
            type="submit"
          >

            {hasAccount ? 'Sign in' : 'Join'}
          </button>
          {error && <p className="login__error">{error}</p>}
          <div className="login__sign-up">
            <p className="login__sign-up__text">{hasAccount ? 'Haven\'t account?' : 'Already have account?'}</p>
            <button
              onClick={() => setHasAccount((prev) => !prev)}
              className="login__sign-up__button"
              type="button"
            >
              {hasAccount ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
        {loader && <Loader classToAdd="loader--form" />}
      </form>
    </div>
  );
};
