import api from '../api';

export default {
  findAllForLoggedUser() {
    return new Promise((resolve, reject) => {
      api
        .get(`/condominios/${api.condo().id}/visitantes/morador`)
        .then((response) => {
          const data = response.data;
          if (data) resolve(data);
          else reject(response);
        })
        .catch(reject);
    });
  },

  findAllByDate(date) {
    return new Promise((resolve, reject) => {
      api
        .post(
          `/condominios/${api.condo().id}/visitantes/periodo`,
          {},
          { data: date }
        )
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
        .get(`/condominios/${api.condo().id}/visitantes/${id}`)
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
        .post(`/condominios/${api.condo().id}/visitantes`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  update(data, id) {
    return new Promise((resolve, reject) => {
      api
        .put(`/condominios/${api.condo().id}/visitantes/${id}`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  remove(id) {
    return new Promise((resolve, reject) => {
      api
        .remove(`/condominios/${api.condo().id}/visitantes/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  sendVisitLog(data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/condominios/${api.condo().id}/visitantes/log`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },
};
