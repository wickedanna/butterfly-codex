import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import authData from '../../../helpers/data/authData';
import sightingShape from '../../../helpers/propz/sightingShape';

import './Sightings.scss';

class Sightings extends React.Component {
  static propTypes = {
    removeSighting: PropTypes.func.isRequired,
    sighting: sightingShape.sightingShape,
  }

  render() {
    const { sighting, removeSighting } = this.props;
    const editLink = `/edit/${sighting.id}`;
    const uid = authData.getUid();

    return (
      <div className="Sightings d-flex flex-wrap col-md-4">
        <div className="card my-2 col-sm-12 sighting-card">
         <div className="card-body">
            <h5 className="card-title">{sighting.butterflyCommonName}</h5>
            <p className="card-text">{sighting.city}, {sighting.state}</p>
            <p className="card-text">{sighting.dateSeen}</p>
            <p className="card-text">Quantity: {sighting.quantity}</p>
            {
              sighting.uid === uid
                ? (
                  <React.Fragment>
                  <Link className="btn btn-yellow m-1" to={editLink}><i className="fas fa-pencil-alt"></i></Link>
                  <button className="btn btn-danger m-1" onClick={() => removeSighting(sighting.id)}><i className="fas fa-trash-alt"></i></button>
                  </React.Fragment>
                )
                : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Sightings;
