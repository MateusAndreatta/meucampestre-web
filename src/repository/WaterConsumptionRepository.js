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
};
