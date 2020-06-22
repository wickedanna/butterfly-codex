import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import firebase from 'firebase/app';
import 'firebase/auth';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;

    const buildNavbar = () => {
      const { authed } = this.props;
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/components/">+ Sighting</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/components/">My Sightings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.logMeOut}>Logout</NavLink>
          </NavItem>
        </Nav>
        );
      }
      return <Nav className="ml-auto" navbar></Nav>;
    };

    return (
      <div className="MyNavbar">
        {/* <button className="btn btn-danger" onClick={this.logMeOut}>Logout</button> */}
        <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Butterfly Codex</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          {buildNavbar()}
        </Collapse>
      </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
