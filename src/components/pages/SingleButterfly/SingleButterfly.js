import React from 'react';
import {
  Map,
  CircleMarker,
  TileLayer,
  Tooltip,
} from 'react-leaflet';

import butterflyData from '../../../helpers/data/butterflyData';
import sightingsData from '../../../helpers/data/sightingsData';
import smash from '../../../helpers/data/smash';
import data from '../../../helpers/data/cities';

import Sightings from '../../shared/Sightings/Sightings';

import './SingleButterfly.scss';

class SingleButterfly extends React.Component {
  state = {
    butterfly: {},
    sightings: [],
  }

  getSingleButterfly = () => {
    const { butterflyId } = this.props.match.params;
    butterflyData.getSingleButterfly(butterflyId)
      .then((response) => {
        this.setState({ butterfly: response.data });
      })
      .catch((err) => console.error('could not get single butterfly: ', err));
  }

  getButterflySightings = () => {
    const { butterflyId } = this.props.match.params;
    smash.getFinalSightingsWithButterflyId(butterflyId)
      .then((sightings) => {
        this.setState({ sightings });
      })
      .catch((err) => console.error('could not get sightings by butterfly id: ', err));
  }

  componentDidMount() {
    this.getSingleButterfly();
    this.getButterflySightings();
  }

  removeSighting = (sightingId) => {
    sightingsData.deleteSighting(sightingId)
      .then(() => this.getButterflySightings())
      .catch((err) => console.error('could not delete sighting', err));
  }

  render() {
    const centerLat = (data.minLat + data.maxLat) / 2;
    const distanceLat = data.maxLat - data.minLat;
    const bufferLat = distanceLat * 0.05;
    const centerLong = (data.minLong + data.maxLong) / 2;
    const distanceLong = data.maxLong - data.minLong;
    const bufferLong = distanceLong * 0.15;

    const { butterfly, sightings } = this.state;

    const buildSightings = sightings.map((sighting) => (
      <Sightings key={sighting.id} sighting={sighting} removeSighting={this.removeSighting} />
    ));

    return (
      <div className="SingleButterfly container">
        <div className="butterfly-info col-12 mt-3 d-flex flex-wrap">
        <div className="main-image-container">
          <img src={butterfly.mainImage} className="main-image" alt="please refer to description below"/>
        </div>
        <h2 className="mx-3 single-butterfly-title">The {butterfly.commonName} Butterfly</h2>
        <h4 className="mx-3 basic-info-title">Common Name: <span className="basic-info-text">{butterfly.commonName}</span></h4>
        <h4 className="mx-3 basic-info-title">Scientific Name: <span className="basic-info-text">{butterfly.scientificName}</span></h4>
        <h4 className="mx-3 basic-info-title">Type: <span className="basic-info-text">{butterfly.type}</span></h4>
        <h4 className="mx-3 basic-info-title">Physical Characteristics</h4>
        <h5 className="mx-3 basic-info-subtitle">Adult</h5>
        <p className="mx-3 basic-info-text">{butterfly.adultAppearance}</p>
        <h5 className="mx-3 basic-info-subtitle">Egg, Larvae, Pupae</h5>
        <p className="mx-3 basic-info-text">{butterfly.larvaeAppearance}</p>
        <h4 className="mx-3 basic-info-title">What do they Eat?</h4>
        <p className="mx-3 basic-info-text">{butterfly.diet}</p>
        <h4 className="mx-3 basic-info-title">What kind of area do these butterflies prefer?</h4>
        <p className="mx-3 basic-info-text">{butterfly.preferredClimate} {butterfly.commonlyFound}</p>
        <h4 className="mx-3 basic-info-title">Lifespan</h4>
        <p className="mx-3 basic-info-text">{butterfly.lifespan} {butterfly.activeWhen}</p>
        <h4 className="m-2 basic-info-title">Population Map:</h4>

        <Map
          style={{ height: '480px', width: '100%' }}
          zoom={1}
          center={[centerLat, centerLong]}
          bounds={[
            [data.minLat - bufferLat, data.minLong - bufferLong],
            [data.maxLat + bufferLat, data.maxLong + bufferLong],
          ]}>
            <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data.city.map((city) => (
              <CircleMarker
                center={[city.coordinates[1], city.coordinates[0]]}
                radius={20 * Math.log(city.population / 10000000)}
                fillOpacity={0.5}
                stroke={false}
              >
                  <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                <span>{city.name}: Population {city.population}</span>
                </Tooltip>
                </CircleMarker>
            ))
          }
        </Map>
        </div>

        <div className="butterfly-sightings container d-flex flex-wrap">
          <h3 className="mx-3 butterfly-sightings-title">Sightings:</h3>
        {buildSightings}
        </div>
      </div>
    );
  }
}

export default SingleButterfly;
