import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="MyNavbar">
        <button className="btn btn-danger" onClick={this.logMeOut}>Logout</button>
      </div>
    );
  }
}

export default MyNavbar;
