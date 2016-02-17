import React, {PropTypes} from 'react-native';

export default PropTypes.shape({
    duration: PropTypes.number,
    delay: PropTypes.number,
    springDamping: PropTypes.number,
    initialVelocity: PropTypes.number,
    type: PropTypes.oneOf(['spring', 'linear', 'easeInEaseOut', 'easeIn', 'easeOut', 'keyboard']),
    property: PropTypes.oneOf(['opacity', 'scaleXY'])
});

