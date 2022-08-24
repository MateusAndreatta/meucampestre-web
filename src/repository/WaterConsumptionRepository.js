import api from '../api';

export default {
  create(data, idUnidade) {
    return new Promise((resolve, reject) => {
      api
        .post(
          `/condominios/${api.condo().id}/hidrometros/${idUnidade}`,
          {},
          data
        )
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  validate(data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/condominios/${api.condo().id}/statusLeituras/`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  getCondoDashboard(month) {
    return new Promise((resolve, reject) => {
      api
        .get(`/condominios/${api.condo().id}/hidrometros/dashboard/${month}`)
        .then((response) => {
          const data = response.data;
          if (data) resolve(data);
          else reject(response);
        })
        .catch(reject);
    });
  },

  getUserDashboard(document) {
    return new Promise((resolve, reject) => {
      api
        .get(
          `/condominios/${
            api.condo().id
          }/hidrometros/dashboard/morador/${document}`
        )
        .then((response) => {
          const data = response.data;
          if (data) resolve(data);
          else reject(response);
        })
        .catch(reject);
    });
  },

  getCondoValues() {
    return new Promise((resolve, reject) => {
      api
        .get(`/condominios/${api.condo().id}/hidrometros`)
        .then((response) => {
          const data = response.data;
          if (data) resolve(data);
          else reject(response);
        })
        .catch(reject);
    });
  },

  remove(id) {
    return new Promise((resolve, reject) => {
      api
        .remove(`/condominios/${api.condo().id}/hidrometros/leituras/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  update(data, id) {
    return new Promise((resolve, reject) => {
      api
        .put(
          `/condominios/${api.condo().id}/hidrometros/leituras/${id}`,
          {},
          data
        )
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },
};
