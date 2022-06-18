import axios from 'axios';

import { API_ENDPOINT } from './globals';
import SessionData from './utils/sessionData';

export default {
  get: function (url, params = {}) {
    return axios({
      method: 'GET',
      url: `${API_ENDPOINT}${url}`,
      params: params,
      headers: {
        Authorization: `Bearer ${SessionData.getToken()}`,
      },
    });
  },

  post: function (url, params = {}, data = {}) {
    return axios({
      method: 'POST',
      url: `${API_ENDPOINT}${url}`,
      params: params,
      data: data,
      headers: {
        Authorization: `Bearer ${SessionData.getToken()}`,
      },
    });
  },

  put: function (url, params = {}, data = {}) {
    return axios({
      method: 'PUT',
      url: `${API_ENDPOINT}${url}`,
      params: params,
      data: data,
      headers: {
        Authorization: `Bearer ${SessionData.getToken()}`,
      },
    });
  },

  remove: function (url, params = {}) {
    return axios({
      method: 'DELETE',
      url: `${API_ENDPOINT}${url}`,
      params: params,
      headers: {
        Authorization: `Bearer ${SessionData.getToken()}`,
      },
    });
  },

  condo: function () {
    return SessionData.getCondo();
  },
};
