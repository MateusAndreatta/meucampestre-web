import api from '../api';

export default {
  update(data) {
    return new Promise((resolve, reject) => {
      api
        .put(`/minhaConta`, {}, data)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  },
  find() {
    return new Promise((resolve, reject) => {
      api
        .get(`/minhaConta`)
        .then((response) => {
          const data = response.data;
          if (data) resolve(data);
          else reject(response);
        })
        .catch(reject);
    });
  },
  findRolesByCondoId(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
      api
        .get(`/minhaConta/${id}`)
        .then((response) => {
          const data = response.data;
          if (data) resolve(data);
          else reject(response);
        })
        .catch(reject);
    });
  },
};
