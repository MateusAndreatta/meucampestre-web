import api from '../api';

export default {
  findAll() {
    return new Promise((resolve, reject) => {
      api
        .get(`/condominios/${api.condo().id}/minhasNotificacoes`)
        .then((response) => {
          const data = response.data;
          if (data) resolve(data);
          else reject(response);
        })
        .catch(reject);
    });
  },

  setListAsRead(data) {
    return new Promise((resolve, reject) => {
      api
        .post(
          `/condominios/${api.condo().id}/notificacoesMarcarComoLidas`,
          {},
          data
        )
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  update(data, document) {
    return new Promise((resolve, reject) => {
      api
        .put(
          `/condominios/${api.condo().id}/documentosBloqueados/${document}`,
          {},
          data
        )
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  remove(id) {
    return new Promise((resolve, reject) => {
      api
        .remove(`/condominios/${api.condo().id}/documentosBloqueados/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },
};
