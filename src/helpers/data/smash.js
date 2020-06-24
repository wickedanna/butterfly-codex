import locationData from './locationData';
import sightingsData from './sightingsData';

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

export default { getSightingLocations };
