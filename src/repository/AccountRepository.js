import api from '../api';

export default {
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
