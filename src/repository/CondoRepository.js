import api from '../api';

export default {
  update(data) {
    return new Promise((resolve, reject) => {
      api
        .put(`/condominio/${api.condo().id}`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },
};
