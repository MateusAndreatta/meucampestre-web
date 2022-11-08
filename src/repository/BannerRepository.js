import api from '../api';

export default {
  findAll() {
    return new Promise((resolve, reject) => {
      api
        .get(`/condominios/${api.condo().id}/banners`)
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
        .post(`/condominios/${api.condo().id}/banners`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  update(data, id) {
    return new Promise((resolve, reject) => {
      api
        .put(`/condominios/${api.condo().id}/banners/${id}`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  remove(id) {
    return new Promise((resolve, reject) => {
      api
        .remove(`/condominios/${api.condo().id}/banners/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },
};
