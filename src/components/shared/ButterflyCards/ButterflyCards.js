import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import butterflyShape from '../../../helpers/propz/butterflyShape';

import './ButterflyCards.scss';

class ButterflyCards extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    butterfly: butterflyShape.butterflyShape,
  }

  render() {
    const { butterfly, authed } = this.props;
    const singleLink = `/butterflies/${butterfly.id}`;

    return (
      <div className="ButterflyCards col-md-4">
        <div className="card my-2">
         <img src={butterfly.mainImage} className="card-img-top" alt="..." />
         <div className="card-body butterfly-card-text">
          <h5 className="card-title">{butterfly.commonName}</h5>
          {
            authed
              ? <Link className="btn btn-dark m-1" to={singleLink}><i className="fas fa-binoculars"></i></Link>
              : ''
          }
          </div>
        </div>
      </div>
    );
  }
}

export default ButterflyCards;
