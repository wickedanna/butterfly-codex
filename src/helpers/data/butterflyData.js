import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getButterflies = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/butterflies.json`)
    .then((response) => {
      const allButterflies = response.data;
      const butterflies = [];
      if (allButterflies) {
        Object.keys(allButterflies).forEach((butterflyId) => {
          allButterflies[butterflyId].id = butterflyId;
          butterflies.push(allButterflies[butterflyId]);
        });
      }
      resolve(butterflies);
    })
    .catch((err) => reject(err));
});

const getSingleButterfly = (butterflyId) => axios.get(`${baseUrl}/butterflies/${butterflyId}.json`);

export default { getButterflies, getSingleButterfly };
