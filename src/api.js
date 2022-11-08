import axios from 'axios';

import { API_ENDPOINT } from './globals';
import SessionData from './utils/sessionData';
import Toaster from './utils/ui/toaster';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.data.path !== '/api/v2/autenticacao' &&
      !error.response.config.url.includes('mapas')
    ) {
      if (error.response.data.message) {
        Toaster.showError(error.response.data.message);
      } else {
        Toaster.showError('Ops, ocorreu um erro, tente novamente mais tarde');
      }
    }

    return Promise.reject(error);
  }
);

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
