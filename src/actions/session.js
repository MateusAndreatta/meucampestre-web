//import Promise from 'bluebird';
import axios from 'axios';
import store from 'store';
import jwtDecode from 'jwt-decode';

import * as types from '../actionTypes';
import { API_ENDPOINT } from '../globals';

function _fetchToken(dispatch, data) {
  return new Promise((resolve, reject) => {
    dispatch(fetchToken(data)).then(resolve).catch(resolve);
  });
}

function _validateToken(dispatch, token) {
  return new Promise((resolve, reject) => {
    dispatch(apiValidateToken(token)).then(resolve).catch(reject);
  });
}

function _renewToken(dispatch, token) {
  return new Promise((resolve, reject) => {
    dispatch(apiRenewToken(token)).then(resolve).catch(reject);
  });
}

function _fetchUser(dispatch, token) {
  return new Promise((resolve, reject) => {
    dispatch(fetchUser(token)).then(resolve).catch(reject);
  });
}

export function fetchToken(data) {
  const request = axios({
    method: 'post',
    data: data,
    url: `${API_ENDPOINT}/autenticacao`,
    headers: {
      'Access-Control-Allow-Origin': `*`,
    },
  });

  return {
    type: types.SESSION_FETCH_TOKEN,
    payload: request,
  };
}

export function apiValidateToken(token) {
  const request = axios({
    method: 'post',
    data: { token: token },
    url: `${API_ENDPOINT}/token/validate`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    type: types.SESSION_VALIDATE_TOKEN,
    payload: request,
  };
}

export function apiRenewToken(token) {
  const request = axios({
    method: 'post',
    data: { token: token },
    url: `${API_ENDPOINT}/token/renew`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    type: types.SESSION_RENEW_TOKEN,
    payload: request,
  };
}

export function fetchUser(token) {
  const request = axios({
    method: 'get',
    url: `${API_ENDPOINT}/minhaConta/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    type: types.SESSION_FETCH_USER,
    payload: request,
  };
}

export function login(data) {
  console.log('log > Session > login called!');

  return async (dispatch) => {
    const fetchTokenResponse = await _fetchToken(dispatch, data).catch(
      console.error
    );
    console.log('a');
    console.log(fetchTokenResponse);
    if (fetchTokenResponse.value) {
      const token = fetchTokenResponse.value.data.access_token;
      console.log(token);
      if (token) {
        store.set('token', token);
        // Extrarir o sub do token (documento)
        // bater em minhaCOnta

        // const tokenData = jwtDecode(token);
        // const userId = tokenData.user.id;
        const fetchUserResponse = await _fetchUser(dispatch, token).catch(
          console.error
        );
        const userData = fetchUserResponse.value.data;
        console.log(userData);
        store.set('user', userData);
      }
    }

    return fetchTokenResponse;
  };
}

export function validateToken(token) {
  console.log('log > Session > validateToken called!');

  return async (dispatch) => {
    const response = await _validateToken(dispatch, token).catch(console.error);

    if (response.value.status === 200) {
      const tokenData = jwtDecode(token);
      const userId = tokenData.user.id;
      const fetchUserResponse = await _fetchUser(dispatch, token, {
        id: userId,
      }).catch(console.error);
      const userData = fetchUserResponse.value.data;

      store.set('user', userData);
    }
  };
}

export function renewToken(token) {
  console.log('log > Session > renewToken called!');

  return async (dispatch) => {
    const renewTokenResponse = await _renewToken(dispatch, token).catch(
      console.error
    );
    const newToken = renewTokenResponse.value.data.token;

    if (newToken) {
      const tokenData = jwtDecode(newToken);
      const userId = tokenData.user.id;
      const fetchUserResponse = await _fetchUser(dispatch, newToken, {
        id: userId,
      }).catch(console.error);
      const userData = fetchUserResponse.value.data;

      store.set('token', newToken);
      store.set('user', userData);
    }

    return renewTokenResponse;
  };
}

export function logout() {
  console.log('log > Session > logout called!');

  return async (dispatch) => {
    store.remove('token');
    store.remove('user');

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch({
      type: types.SESSION_LOGOUT,
      payload: null,
    });
  };
}
