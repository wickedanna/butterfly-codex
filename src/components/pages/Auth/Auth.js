import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Jumbotron } from 'reactstrap';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">
        <Jumbotron>
          <h1 className="display-3">Welcome to Butterfly Codex</h1>
          <hr className="my-2" />
          <p>Help us track butterflies of the United States of America</p>
          <p className="lead">
            <button className="btn btn-info" onClick={this.loginClickEvent}>Login with Google</button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Auth;
