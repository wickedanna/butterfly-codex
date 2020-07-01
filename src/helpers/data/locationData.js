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
        // eslint-disable-next-line no-confusing-arrow
        locations.sort((a, b) => (a.state > b.state) ? 1 : -1);
        // the line above uses the sort method on the locations array
        // it takes a & b, which represent the indices of two objects within the array and compares them
        // it gives a value of 1 or -1 to determine where they should go, and ends with the objects
        // in alphabetical order by the state property
      }
      resolve(locations);
    })
    .catch((err) => reject(err));
});

export default { getLocations };
