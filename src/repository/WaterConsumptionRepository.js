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
};
