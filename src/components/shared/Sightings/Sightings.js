import React from 'react';

import sightingShape from '../../../helpers/propz/sightingShape';

import './Sightings.scss';

class Sightings extends React.Component {
  static propTypes = {
    sighting: sightingShape.sightingShape,
  }

  render() {
    const { sighting } = this.props;
    return (
      <div className="Sightings">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{sighting.butterflyId}</h5>
            <p className="card-text">{sighting.city}, {sighting.state}</p>
            <p className="card-text">{sighting.dateSeen}</p>
            <p className="card-text">Quantity: {sighting.quantity}</p>
         </div>
        </div>
      </div>
    );
  }
}

export default Sightings;
