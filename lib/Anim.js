import PropTypes from 'prop-types';
import ReactNative, { LayoutAnimation } from 'react-native';

export default PropTypes.shape({
    duration: PropTypes.number,
    delay: PropTypes.number,
    springDamping: PropTypes.number,
    initialVelocity: PropTypes.number,
    type: PropTypes.oneOf(Object.keys(LayoutAnimation.Types)),
    property: PropTypes.oneOf(Object.keys(LayoutAnimation.Properties))
});

