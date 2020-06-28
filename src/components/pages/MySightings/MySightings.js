import React from 'react';

import authData from '../../../helpers/data/authData';
import smash from '../../../helpers/data/smash';

import Sightings from '../../shared/Sightings/Sightings';

import './MySightings.scss';
import sightingsData from '../../../helpers/data/sightingsData';

class MySightings extends React.Component {
  state = {
    sightings: [],
  }

  getSightingsInfo = () => {
    const currentUid = authData.getUid();
    smash.getFinalSightingsWithUid(currentUid)
      .then((sightings) => {
        this.setState({ sightings });
      })
      .catch((err) => console.error('could not get sightings with locations: ', err));
  }

  componentDidMount() {
    this.getSightingsInfo();
  }

  removeSighting = (sightingId) => {
    sightingsData.deleteSighting(sightingId)
      .then(() => this.getSightingsInfo())
      .catch((err) => console.error('could not delete sighting', err));
  }

  render() {
    const { sightings } = this.state;

    const buildSightings = sightings.map((sighting) => (
      <Sightings key={sighting.id} sighting={sighting} removeSighting={this.removeSighting} />
    ));

    return (
      <div className="MySightings mt-3 container col-12">
        <h1 >My Sightings</h1>
        <div className="my-sightings d-flex flex-wrap">
        {buildSightings}
        </div>
      </div>
    );
  }
}

export default MySightings;
