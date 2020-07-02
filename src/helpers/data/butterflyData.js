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
        // eslint-disable-next-line no-confusing-arrow
        butterflies.sort((a, b) => (a.commonName > b.commonName) ? 1 : -1);
        // look at locationData.js for explanation of how above works
      }
      resolve(butterflies);
    })
    .catch((err) => reject(err));
});

const getSingleButterfly = (butterflyId) => axios.get(`${baseUrl}/butterflies/${butterflyId}.json`);

export default { getButterflies, getSingleButterfly };
