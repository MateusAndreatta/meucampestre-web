import api from '../api';
import { API_ENDPOINT } from '../globals';

export default {
  findAll() {
    return new Promise((resolve, reject) => {
      api
        .get(
          `/condominios/${
            api.condo().id
          }/solicitacaoReserva/reservasDoCondominio`
        )
        .then((response) => {
          const data = response.data;
          if (data) resolve(data);
          else reject(response);
        })
        .catch(reject);
    });
  },

  findAllByUser() {
    return new Promise((resolve, reject) => {
      api
        .get(`/condominios/${api.condo().id}/solicitacaoReserva/minhasReservas`)
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
        .post(`/condominios/${api.condo().id}/solicitacaoReserva`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  getUnavailableDates(id) {
    return new Promise((resolve, reject) => {
      api
        .get(
          `/condominios/${
            api.condo().id
          }/solicitacaoReserva/${id}/datasReservadas`
        )
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
          `/condominios/${api.condo().id}/solicitacaoReserva/${id}`,
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
        .remove(`/condominios/${api.condo().id}/solicitacaoReserva/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },
};
