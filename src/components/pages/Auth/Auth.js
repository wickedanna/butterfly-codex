import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Jumbotron } from 'reactstrap';

import butterflyData from '../../../helpers/data/butterflyData';

import ButterflyCards from '../../shared/ButterflyCards/ButterflyCards';

import './Auth.scss';

class Auth extends React.Component {
  state = {
    butterflies: [],
    selectedButterflies: [],
  }

  getButterflyInfo = () => {
    butterflyData.getButterflies()
      .then((butterflies) => {
        this.setState({ butterflies, selectedButterflies: butterflies });
      })
      .catch((err) => console.error('could not get butterflies: ', err));
  }

  componentDidMount() {
    this.getButterflyInfo();
  }

  filterButterflies = (e) => {
    e.preventDefault();
    const { butterflies } = this.state;
    const selectedType = e.target.value;
    if (selectedType === 'all') {
      this.setState({ selectedButterflies: butterflies });
    } else {
      const filteredButterflies = butterflies.filter((x) => x.type === selectedType);
      this.setState({ selectedButterflies: filteredButterflies });
    }
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    const { selectedButterflies } = this.state;

    const buildButterflies = selectedButterflies.map((butterfly) => (
      <ButterflyCards key={butterfly.id} butterfly={butterfly} authed={false}/>
    ));

    return (
      <div className="Auth container">
        <div className="col-12 mt-3 d-flex flex-wrap">
        <Jumbotron className="col-12 jumbotron">
          <h1 className="display-3 jumbo-text-title">Welcome to Butterfly Codex</h1>
          <hr className="my-2" />
          <p className="jumbo-text">Help us track butterflies of the United States of America</p>
          <p className="lead">
            <button className="btn btn-yellow" onClick={this.loginClickEvent}>Login with Google</button>
          </p>
        </Jumbotron>
        <h2 className="col-12 title">Butterflies</h2>
        <form className="col-12 butterfly-filter">
          <select className="col-6 form-control mb-3" onChange={this.filterButterflies}>
            <option value="all">All</option>
            <option value="Brush-Footed">Brush-Footed</option>
            <option value="Gossamer-Winged">Gossamer-Winged</option>
            <option value="Swallowtail">Swallowtail</option>
          </select>
        </form>
        {buildButterflies}
        </div>
      </div>
    );
  }
}

export default Auth;
