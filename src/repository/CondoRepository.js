import api from '../api';

export default {
  update(data) {
    return new Promise((resolve, reject) => {
      api
        .put(`/condominios`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },
  findById(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`/condominios/${id}`)
        .then((response) => {
          const data = response.data;
          if (data) resolve(data);
          else reject(response);
        })
        .catch(reject);
    });
  },
};
