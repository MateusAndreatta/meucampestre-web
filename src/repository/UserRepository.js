import api from '../api';

export default {
  findAll() {
    return new Promise((resolve, reject) => {
      api
        .get(`/usuarios/${api.condo}/usuario`)
        .then((response) => {
          const data = response.data;
          if (data) resolve(data);
          else reject(response);
        })
        .catch(reject);
    });
  },

  findById(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`/usuarios/${id}`)
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
        .post(`//usuarios/${api.condo}/usuario`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  update(data) {
    return new Promise((resolve, reject) => {
      api
        .put(`/usuarios/${api.condo}/usuario`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  remove(documento) {
    return new Promise((resolve, reject) => {
      api
        .remove(`/usuarios/${api.condo}/usuario/${documento}`)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },
};
