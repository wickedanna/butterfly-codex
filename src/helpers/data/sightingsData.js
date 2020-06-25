import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSightingsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sightings.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const allSightings = response.data;
      const sightings = [];
      if (allSightings) {
        Object.keys(allSightings).forEach((sightingId) => {
          allSightings[sightingId].id = sightingId;
          sightings.push(allSightings[sightingId]);
        });
      }
      resolve(sightings);
    })
    .catch((err) => reject(err));
});

const getSightingsByButterflyId = (butterflyId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sightings.json?orderBy="butterflyId"&equalTo="${butterflyId}"`)
    .then((response) => {
      const allSightings = response.data;
      const sightings = [];
      if (allSightings) {
        Object.keys(allSightings).forEach((sightingId) => {
          allSightings[sightingId].id = sightingId;
          sightings.push(allSightings[sightingId]);
        });
      }
      resolve(sightings);
    })
    .catch((err) => reject(err));
});

export default { getSightingsByUid, getSightingsByButterflyId };
