import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';

import butterflyData from '../../../helpers/data/butterflyData';

import ButterflyCards from '../../shared/ButterflyCards/ButterflyCards';

import './Home.scss';

class Home extends React.Component {
  state = {
    butterflies: [],
  }

  getButterflyInfo = () => {
    butterflyData.getButterflies()
      .then((butterflies) => {
        this.setState({ butterflies });
      })
      .catch((err) => console.error('could not get butterflies: ', err));
  }

  componentDidMount() {
    this.getButterflyInfo();
  }

  render() {
    const { butterflies } = this.state;

    const buildButterflies = butterflies.map((butterfly) => (
      <ButterflyCards key={butterfly.id} butterfly={butterfly} />
    ));

    return (
      <div className="Home col-12 mt-3 d-flex flex-wrap">
        <Jumbotron className="col-12">
          <h1 className="display-3 jumbo-text">Welcome to Butterfly Codex</h1>
          <hr className="my-2" />
          <p className="jumbo-text">Help us track butterflies of the United States of America</p>
          <p className="lead jumbo-text">
            <Link className="btn btn-primary" to="/new-sighting">+ Sighting</Link>
          </p>
        </Jumbotron>
        <h2 className="col-12">Butterflies</h2>
        {buildButterflies}
      </div>
    );
  }
}

export default Home;
