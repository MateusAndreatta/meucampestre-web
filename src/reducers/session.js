import {
  SESSION_FETCH_USER,
  SESSION_VALIDATE_TOKEN,
  SESSION_RENEW_TOKEN,
  SESSION_FETCH_TOKEN,
  SESSION_LOGOUT,
} from '../actionTypes';

const INITIAL_STATE = {
  auth: { pending: false, authenticated: false, token: null, error: null },
  user: { pending: false, data: null, error: null },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = INITIAL_STATE, action) {
  let error, token;

  switch (action.type) {
    case SESSION_RENEW_TOKEN:
      return {
        ...state,
        auth: { pending: true, authenticated: false, token: null, error: null },
      };

    case `${SESSION_RENEW_TOKEN}_PENDING`:
      return {
        ...state,
        auth: { pending: true, authenticated: false, token: null, error: null },
      };

    case `${SESSION_RENEW_TOKEN}_FULFILLED`:
      token = action.payload.data.access_token
        ? action.payload.data.access_token
        : null;

      return {
        ...state,
        auth: {
          pending: false,
          authenticated: !!token,
          token: token,
          error: null,
        },
      };

    case `${SESSION_RENEW_TOKEN}_REJECTED`:
      error = action.payload.response.data.error;

      return {
        ...state,
        auth: {
          pending: false,
          authenticated: false,
          token: null,
          error: error,
        },
      };

    case SESSION_VALIDATE_TOKEN:
      return {
        ...state,
        auth: { pending: true, authenticated: false, token: null, error: null },
      };

    case `${SESSION_VALIDATE_TOKEN}_PENDING`:
      return {
        ...state,
        auth: { pending: true, authenticated: false, token: null, error: null },
      };

    case `${SESSION_VALIDATE_TOKEN}_FULFILLED`:
      token = action.payload.data.access_token
        ? action.payload.data.access_token
        : null;

      return {
        ...state,
        auth: {
          pending: false,
          authenticated: !!token,
          token: token,
          error: null,
        },
      };

    case `${SESSION_VALIDATE_TOKEN}_REJECTED`:
      error = action.payload.response.data.error;

      return {
        ...state,
        auth: {
          pending: false,
          authenticated: false,
          token: null,
          error: error,
        },
      };

    case SESSION_FETCH_TOKEN:
      return {
        ...state,
        auth: { pending: true, authenticated: false, token: null, error: null },
      };

    case `${SESSION_FETCH_TOKEN}_PENDING`:
      return {
        ...state,
        auth: { pending: true, authenticated: false, token: null, error: null },
      };

    case `${SESSION_FETCH_TOKEN}_FULFILLED`:
      token = action.payload.data.access_token
        ? action.payload.data.access_token
        : null;
      return {
        ...state,
        auth: {
          pending: false,
          authenticated: !!token,
          token: token,
          error: null,
        },
      };

    case `${SESSION_FETCH_TOKEN}_REJECTED`:
      error = action.payload.response.data.error;
      return {
        ...state,
        auth: {
          pending: false,
          authenticated: false,
          token: null,
          error: error,
        },
      };

    case SESSION_FETCH_USER:
      return { ...state, user: { pending: true, data: null, error: null } };

    case `${SESSION_FETCH_USER}_PENDING`:
      return { ...state, user: { pending: true, data: null, error: null } };

    case `${SESSION_FETCH_USER}_FULFILLED`:
      console.log('aaa');
      return {
        ...state,
        user: { pending: false, data: action.payload.data, error: null },
      };

    case `${SESSION_FETCH_USER}_REJECTED`:
      error = action.payload.response.data.error;
      return { ...state, user: { pending: false, data: null, error: error } };

    case SESSION_LOGOUT:
      return {
        ...state,
        auth: {
          pending: false,
          authenticated: false,
          token: null,
          error: null,
        },
        user: { pending: false, data: null, error: null },
      };

    default:
      return state;
  }
}
