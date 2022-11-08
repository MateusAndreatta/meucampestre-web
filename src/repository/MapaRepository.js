import api from '../api';

export default {
  findAll() {
    return new Promise((resolve, reject) => {
      api
        .get(`/condominios/${api.condo().id}/mapas`)
        .then((response) => {
          const data = response.data;
          if (data) resolve(data);
          else reject(response);
        })
        .catch(reject);
    });
  },

  create(data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/condominios/${api.condo().id}/mapas`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  update(data) {
    return new Promise((resolve, reject) => {
      api
        .put(`/condominios/${api.condo().id}/mapas`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  remove() {
    return new Promise((resolve, reject) => {
      api
        .remove(`/condominios/${api.condo().id}/mapas`)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },
};
