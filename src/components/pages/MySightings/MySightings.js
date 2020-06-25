import React from 'react';

import authData from '../../../helpers/data/authData';
import smash from '../../../helpers/data/smash';

import Sightings from '../../shared/Sightings/Sightings';

import './MySightings.scss';

class MySightings extends React.Component {
  state = {
    sightings: [],
  }

  getSigtingsInfo = () => {
    const currentUid = authData.getUid();
    smash.getFinalSightingsWithUid(currentUid)
      .then((sightings) => {
        this.setState({ sightings });
      })
      .catch((err) => console.error('could not get sightings with locations: ', err));
  }

  componentDidMount() {
    this.getSigtingsInfo();
  }

  render() {
    const { sightings } = this.state;

    const buildSightings = sightings.map((sighting) => (
      <Sightings key={sighting.id} sighting={sighting} />
    ));

    return (
      <div className="MySightings">
        <h1>My Sightings</h1>
        {buildSightings}
      </div>
    );
  }
}

export default MySightings;
