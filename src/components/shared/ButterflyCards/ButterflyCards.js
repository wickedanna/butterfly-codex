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
      <div className="ButterflyCards">
        <h2>{butterfly.commonName}</h2>
      </div>
    );
  }
}

export default ButterflyCards;
