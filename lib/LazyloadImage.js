import React, {
    Component,
    PropTypes
} from 'react';
import {
    Image,
    Platform
} from 'react-native';
import LazyloadView from './LazyloadView';
import Anim from './Anim';

const GREY_PLACEHOLDER = { uri:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' };

class LazyloadImage extends LazyloadView{
    static displayName = 'LazyloadImage';

    static defaultProps = {
        placeholder: GREY_PLACEHOLDER
    }

    static propTypes = {
        host: PropTypes.string,
        initialVisibility: PropTypes.bool,
        animation: PropTypes.oneOfType([
            PropTypes.shape({
                duration: PropTypes.number,
                create: Anim,
                update: Anim,
                delete: Anim
            }),
            PropTypes.bool
        ]),
        placeholder: Image.propTypes.source,
        ...Image.propTypes
    };

    render() {
        let key = null;
        if (this.props.animation) {
            key = this.state.visible ? 'visible' : 'invisible';
        }
        return this.props.host ? <Image
            ref={ele => this._root = ele}
            {...this.props}
            onLayout={this._onLayout}
            key={key}
            source={this.state.visible ? this.props.source : this.props.placeholder}
        /> : <Image
            ref={ele => this._root = ele}
            {...this.props}
        />;
    }
}

export default LazyloadImage;
