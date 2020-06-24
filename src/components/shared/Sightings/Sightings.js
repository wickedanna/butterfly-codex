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
      <div className="Sightings d-flex flex-wrap col-md-4">
        <div className="card my-2 col-sm-12">
         <div className="card-body butterfly-card-text">
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
