import api from '../api';

export default {
  login(data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/autenticacao`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },

  passwordReset(data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/conta/redefinirSenha`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },
};
