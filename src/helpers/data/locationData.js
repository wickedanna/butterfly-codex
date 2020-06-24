import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getLocations = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/locations.json`)
    .then((response) => {
      const allLocations = response.data;
      const locations = [];
      if (allLocations) {
        Object.keys(allLocations).forEach((locationId) => {
          allLocations[locationId].id = locationId;
          locations.push(allLocations[locationId]);
        });
      }
      resolve(locations);
    })
    .catch((err) => reject(err));
});

export default { getLocations };
