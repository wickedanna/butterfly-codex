import React from 'react';

import authData from '../../../helpers/data/authData';
import butterflyData from '../../../helpers/data/butterflyData';
import locationData from '../../../helpers/data/locationData';
import sightingsData from '../../../helpers/data/sightingsData';

import './EditSighting.scss';

class EditSighting extends React.Component {
  state = {
    butterflies: [],
    locations: [],
    sightingLocationId: '',
    sightingButterflyId: '',
    sightingDate: '',
    sightingQuantity: 0,
  }

  getButterflies = () => {
    butterflyData.getButterflies()
      .then((butterflies) => {
        this.setState({ butterflies });
      })
      .catch((err) => console.error('could not get butterflies: ', err));
  }

  getLocations = () => {
    locationData.getLocations()
      .then((locations) => {
        this.setState({ locations });
      })
      .catch((err) => console.error('could not get locations: ', err));
  }

  singleSighting = () => {
    const editId = this.props.match.params.sightingId;
    sightingsData.getSingleSighting(editId)
      .then((response) => {
        const sighting = response.data;
        this.setState({
          sightingLocationId: sighting.locationId,
          sightingButterflyId: sighting.butterflyId,
          sightingDate: sighting.dateSeen,
          sightingQuantity: sighting.quantity,
        });
      })
      .catch((err) => console.error('could not get single sighting: ', err));
  }

  componentDidMount() {
    this.getButterflies();
    this.getLocations();
    this.singleSighting();
  }

  butterflyChange = (e) => {
    e.preventDefault();
    this.setState({ sightingButterflyId: e.target.value });
  }

  locationChange = (e) => {
    e.preventDefault();
    this.setState({ sightingLocationId: e.target.value });
  }

  dateChange = (e) => {
    e.preventDefault();
    this.setState({ sightingDate: e.target.value });
  }

  quantityChange = (e) => {
    e.preventDefault();
    this.setState({ sightingQuantity: e.target.value });
  }

  editSighting = (e) => {
    e.preventDefault();
    const { sightingId } = this.props.match.params;
    const {
      sightingButterflyId,
      sightingLocationId,
      sightingDate,
      sightingQuantity,
    } = this.state;
    const updatedSighting = {
      butterflyId: sightingButterflyId,
      locationId: sightingLocationId,
      dateSeen: sightingDate,
      quantity: sightingQuantity * 1,
      uid: authData.getUid(),
    };
    sightingsData.updateSighting(sightingId, updatedSighting)
      .then(() => this.props.history.push('/my-sightings'))
      .catch((err) => console.error('could not save new sighting: ', err));
  }

  render() {
    const {
      butterflies,
      locations,
      sightingLocationId,
      sightingButterflyId,
      sightingDate,
      sightingQuantity,
    } = this.state;

    const butterflyOptions = butterflies.map((butterfly) => (
      <option key={butterfly.id} value={butterfly.id}>{butterfly.commonName}</option>
    ));

    const locationOptions = locations.map((location) => (
      <option key={location.id} value={location.id}>{location.city}, {location.state}</option>
    ));
    return (
      <div className="EditSighting mt-3 d-flex flex-wrap container">
        <h1 className="col-12">Edit Sighting</h1>
        <form className="edit-form col-sm-12 col-md-10 col-lg-6">
  <div className="form-group">
    <label htmlFor="sighting-butterfly">Which butterfly did you see?</label>
    <br />
    <select id="sighting-butterfly" value={sightingButterflyId} onChange={this.butterflyChange}>
      <option>Select Butterfly</option>
      {butterflyOptions}
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="sighting-location">Where did you spot this butterfly?</label>
    <br />
    <select id="sighting-location" value={sightingLocationId} onChange={this.locationChange}>
      <option>Select Location</option>
      {locationOptions}
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="sighting-date">When did you see it?</label>
    <br />
    <input type="date" className="form-control" id="sighting-date" value={sightingDate} onChange={this.dateChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="sighting-quantity">How many did you spot?</label>
    <br />
    <input type="number" className="form-control" id="sighting-quantity" value={sightingQuantity} onChange={this.quantityChange}/>
  </div>
  <button type="submit" className="btn btn-yellow" onClick={this.editSighting}>Update Sighting</button>
</form>
      </div>
    );
  }
}

export default EditSighting;
