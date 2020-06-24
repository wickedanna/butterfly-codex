import React from 'react';

import sightingShape from '../../../helpers/propz/sightingShape';

import './Sightings.scss';

class Sightings extends React.Component {
  static propTypes = {
    sighting: sightingShape.sightingShape,
  }

  render() {
    const { sighting } = this.props;
    console.error('sighting: ', sighting);
    return (
      <div className="Sightings">
        <p>{sighting.locationId}</p>
      </div>
    );
  }
}

export default Sightings;
