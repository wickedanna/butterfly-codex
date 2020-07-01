import locationData from './locationData';
import sightingsData from './sightingsData';
import butterflyData from './butterflyData';

const getFinalSightingsWithButterflyId = (butterflyId) => new Promise((resolve, reject) => {
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

const getFinalSightingsWithUid = (uid) => new Promise((resolve, reject) => {
  sightingsData.getSightingsByUid(uid)
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

const getPopulationData = (butterflyId) => new Promise((resolve, reject) => {
  // get sightings by butterflyId (need to get by butterflyId b/c they are showing on the single view)
  // get locations
  // use a forEach loop and call the single instance singleLocation or something
  // declare a variable called location and do the {...singleLocation} copy thing (spread operator)
  // then create a new key called coordinates that is an array, which will be the longitude and latitude values from the location object
  // something about the sightings data to get the quantities to pass into the location object
});

export default { getFinalSightingsWithButterflyId, getFinalSightingsWithUid, getPopulationData };
