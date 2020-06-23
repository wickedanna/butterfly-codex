import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../helpers/data/connection';

import AddSighting from '../components/pages/AddSighting/AddSighting';
import Auth from '../components/pages/Auth/Auth';
import EditSighting from '../components/pages/EditSighting/EditSighting';
import Home from '../components/pages/Home/Home';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import MySightings from '../components/pages/MySightings/MySightings';
import SingleButterfly from '../components/pages/SingleButterfly/SingleButterfly';

import './App.scss';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

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
        <BrowserRouter>
        <React.Fragment>
          <MyNavbar authed={authed}/>
            <Switch>
              <PrivateRoute path='/home' component={Home} authed={authed}/>
              <PrivateRoute path='/new-sighting' component={AddSighting} authed={authed}/>
              <PrivateRoute path='/my-sightings' component={MySightings} authed={authed}/>
              <PrivateRoute path='/butterflies/:butterflyId' component={SingleButterfly} authed={authed}/>
              <PrivateRoute path='/edit/:sightingId' component={EditSighting} authed={authed}/>
              <PublicRoute path='/auth' component={Auth} authed={authed}/>
              <Redirect from="*" to="/home" />
            </Switch>
        </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
