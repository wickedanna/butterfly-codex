import PropTypes from 'prop-types';

const butterflyShape = PropTypes.shape({
  commonName: PropTypes.string.isRequired,
  scientificName: PropTypes.string.isRequired,
  adultAppearance: PropTypes.string.isRequired,
  larvaeAppearance: PropTypes.string.isRequired,
  diet: PropTypes.string.isRequired,
  preferredClimate: PropTypes.string.isRequired,
  commonlyFound: PropTypes.string.isRequired,
  mainImage: PropTypes.string.isRequired,
  lifespan: PropTypes.string.isRequired,
  activeWhen: PropTypes.string.isRequired,
});

export default { butterflyShape };
