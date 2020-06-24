import PropTypes from 'prop-types';

const sightingShape = PropTypes.shape({
  locationId: PropTypes.string.isRequired,
  butterflyId: PropTypes.string.isRequired,
  dateSeen: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { sightingShape };
