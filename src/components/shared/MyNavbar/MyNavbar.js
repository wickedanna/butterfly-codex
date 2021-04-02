import React, { useState } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
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

const MyNavbar = (props) => {
  const { authed } = props;
  const [isOpen, setIsOpen] = useState(false);

  const logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  const toggle = () => setIsOpen(!isOpen);

  const buildNavbar = () => {
    if (authed) {
      return (
          <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to="/new-sighting">+ Sighting</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/my-sightings">My Sightings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={logMeOut}>Logout</NavLink>
          </NavItem>
        </Nav>
      );
    }
    return <Nav className="ml-auto" navbar></Nav>;
  };

  return (
      <div className="MyNavbar">
        <Navbar dark expand="md">
        <NavbarBrand tag={RRNavLink} to="/home">Butterfly Codex</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {buildNavbar()}
        </Collapse>
      </Navbar>
      </div>
  );
};

export default MyNavbar;
