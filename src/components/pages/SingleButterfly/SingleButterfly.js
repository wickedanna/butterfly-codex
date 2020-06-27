import React from 'react';

import butterflyData from '../../../helpers/data/butterflyData';
import sightingsData from '../../../helpers/data/sightingsData';
import smash from '../../../helpers/data/smash';

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
    const { butterfly, sightings } = this.state;

    const buildSightings = sightings.map((sighting) => (
      <Sightings key={sighting.id} sighting={sighting} removeSighting={this.removeSighting} />
    ));

    return (
      <div className="SingleButterfly container">
        <div className="col-12 mt-3 d-flex flex-wrap">
        <div className="main-image-container">
          <img src={butterfly.mainImage} className="main-image" alt="please refer to description below"/>
        </div>
        <h2 className="mx-3 single-butterfly-title">The {butterfly.commonName} Butterfly</h2>
        <h4 className="mx-3 basic-info">Common Name: {butterfly.commonName}</h4>
        <h4 className="mx-3 basic-info">Scientific Name: {butterfly.scientificName}</h4>
        <h4 className="mx-3 basic-info">Type: {butterfly.type}</h4>
        <h4 className="mx-3 basic-info">Physical Characteristics</h4>
        <h5 className="mx-3 basic-info">Adult</h5>
        <p className="mx-3 basic-info">{butterfly.adultAppearance}</p>
        <h5 className="mx-3 basic-info">Egg, Larvae, Pupae</h5>
        <p className="mx-3 basic-info">{butterfly.larvaeAppearance}</p>
        <h4 className="mx-3 basic-info">What do they Eat?</h4>
        <p className="mx-3 basic-info">{butterfly.diet}</p>
        <h4 className="mx-3 basic-info">What kind of area do these butterflies prefer?</h4>
        <p className="mx-3 basic-info">{butterfly.preferredClimate} {butterfly.commonlyFound}</p>
        <h4 className="mx-3 basic-info">Lifespan</h4>
        <p className="mx-3 basic-info">{butterfly.lifespan} {butterfly.activeWhen}</p>
        </div>
        <div className="butterfly-sightings container d-flex flex-wrap">
          <h3 className="mx-3 single-butterfly-title">Sightings:</h3>
        {buildSightings}
        </div>
      </div>
    );
  }
}

export default SingleButterfly;
