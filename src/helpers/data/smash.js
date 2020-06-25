import locationData from './locationData';
import sightingsData from './sightingsData';
import butterflyData from './butterflyData';

const getSightingLocations = (butterflyId) => new Promise((resolve, reject) => {
  sightingsData.getSightingsByButterflyId(butterflyId)
    .then((sightingsResponse) => {
      locationData.getLocations().then((locationsResponse) => {
        const finalSightings = [];
        sightingsResponse.forEach((singleSighting) => {
          const sighting = { ...singleSighting };
          const selectedLocation = locationsResponse.find((x) => x.id === sighting.locationId);
          sighting.city = selectedLocation.city;
          sighting.state = selectedLocation.state;
          finalSightings.push(sighting);
        });
        resolve(finalSightings);
      });
    })
    .catch((err) => reject(err));
});

const getSightingByUidLocation = (uid) => new Promise((resolve, reject) => {
  sightingsData.getSightingsByUid(uid)
    .then((sightingsResponse) => {
      locationData.getLocations().then((locationsResponse) => {
        const finalSightings = [];
        sightingsResponse.forEach((singleSighting) => {
          const sighting = { ...singleSighting };
          const selectedLocation = locationsResponse.find((x) => x.id === sighting.locationId);
          sighting.city = selectedLocation.city;
          sighting.state = selectedLocation.state;
          finalSightings.push(sighting);
        });
        console.error('sighting: ', finalSightings);
        resolve(finalSightings);
      });
    })
    .catch((err) => reject(err));
});

const gettingFinalSightings = (butterflyId) => new Promise((resolve, reject) => {
  sightingsData.getSightingsByButterflyId(butterflyId)
    .then((sightingsResponse) => {
      locationData.getLocations().then((locationsResponse) => {
        butterflyData.getButterflies().then((butterflyResponse) => {
          const finalSightings = [];
          sightingsResponse.forEach((singleSighting) => {
            const sighting = { ...singleSighting };
            const selectedLocation = locationsResponse.find((x) => x.id === sighting.locationId);
            sighting.city = selectedLocation.city;
            sighting.state = selectedLocation.state;
            const selectedButterfly = butterflyResponse.find((x) => x.id === sighting.butterflyId);
            sighting.butterflyCommonName = selectedButterfly.commonName;
            finalSightings.push(sighting);
          });
          resolve(finalSightings);
        });
      });
    })
    .catch((err) => reject(err));
});

export default { getSightingLocations, getSightingByUidLocation, gettingFinalSightings };
