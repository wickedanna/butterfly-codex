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

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    const { butterflies } = this.state;

    const buildButterflies = butterflies.map((butterfly) => (
      <ButterflyCards key={butterfly.id} butterfly={butterfly} />
    ));

    return (
      <div className="Auth col-12 mt-3 d-flex flex-wrap">
        <Jumbotron className="col-12">
          <h1 className="display-3">Welcome to Butterfly Codex</h1>
          <hr className="my-2" />
          <p>Help us track butterflies of the United States of America</p>
          <p className="lead">
            <button className="btn btn-info" onClick={this.loginClickEvent}>Login with Google</button>
          </p>
        </Jumbotron>
        {buildButterflies}
      </div>
    );
  }
}

export default Auth;
