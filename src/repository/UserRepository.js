import api from '../api';

export default {
  findAll() {
    return new Promise((resolve, reject) => {
      api
        .get(`/usuarios/${api.condo().id}/usuario`)
        .then((response) => {
          const data = response.data;
          if (data) resolve(data);
          else reject(response);
        })
        .catch(reject);
    });
  },

  findByDocument(document) {
    return new Promise((resolve, reject) => {
      api
        .get(`/usuarios/${api.condo().id}/usuario/${document}`)
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
        .post(`/usuarios/${api.condo().id}/usuario`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  update(data, document) {
    return new Promise((resolve, reject) => {
      api
        .put(`/usuarios/${api.condo().id}/usuario/${document}`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  remove(document) {
    return new Promise((resolve, reject) => {
      api
        .remove(`/usuarios/${api.condo().id}/usuario/${document}`)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },
};
