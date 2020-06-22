import React from 'react';

import butterflyShape from '../../../helpers/propz/butterflyShape';

import './ButterflyCards.scss';

class ButterflyCards extends React.Component {
  static propTypes = {
    butterfly: butterflyShape.butterflyShape,
  }

  render() {
    const { butterfly } = this.props;
    return (
      <div className="ButterflyCards col-md-4">
        <div className="card my-2">
         <img src={butterfly.mainImage} className="card-img-top" alt="..." />
         <div className="card-body butterfly-card-text">
          <h5 className="card-title">{butterfly.commonName}</h5>
         </div>
        </div>
      </div>
    );
  }
}

export default ButterflyCards;
