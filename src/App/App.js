import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../helpers/data/connection';

import Auth from '../components/pages/Auth/Auth';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

import './App.scss';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.RemoveListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.RemoveListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <MyNavbar authed={authed} />
        <h2>Butterfly Codex</h2>
          <Auth />
      </div>
    );
  }
}

export default App;
