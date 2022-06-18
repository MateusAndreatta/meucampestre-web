import api from '../api';

export default {
  findAll() {
    return new Promise((resolve, reject) => {
      api
        .get(`/unidades/condominios/${api.condo().id}`)
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
        .get(`/unidades/condominios/${api.condo().id}/unidades/${id}`)
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
        .post(`/unidades/condominios/${api.condo().id}/unidades`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  update(data, id) {
    return new Promise((resolve, reject) => {
      api
        .put(`/unidades/condominios/${api.condo().id}/unidades/${id}`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  remove(id) {
    return new Promise((resolve, reject) => {
      api
        .remove(`/unidades/condominios/${api.condo().id}/unidades/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },
};
