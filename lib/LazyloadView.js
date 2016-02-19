import React, {
    Component,
    View,
    PropTypes,
    LayoutAnimation
} from 'react-native';

import LayzloadManager from './LayzloadManager';
import Anim from './Anim';

let id = 0;

class LazyloadView extends Component{
    static displayName = 'LazyloadView';

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
        ...View.propTypes
    };

    static defaultProps = {
        initialVisibility: false,
        animation: {
            duration: 350,
            create: {
                property: LayoutAnimation.Properties.opacity,
                type: 'easeIn'
            }
        }
    };

    constructor() {
        super(...arguments);
        this._id = id++;
        this._visible = this.props.initialVisibility;
        this.state = {
            visible: this._visible
        };
    };

    componentWillUnmount = () => {
        LayzloadManager.remove(this.props.host, this._id);
    };

    _root = null;
    _visible = null;
    _timeout = null;

    _toggle = (visible: boolean) => {
        if (this._visible !== visible) {
            this._visible = visible;
            clearTimeout(this._timeout);
            this._timeout = setTimeout(() => {
                this.props.animation && LayoutAnimation.configureNext(this.props.animation);
                this.setState({
                    visible
                });
            }, 16);
        }
    };

    _onLayout = (...args) => {
        this.props.onLayout && this.props.onLayout(...args);
        LayzloadManager.add(
            this.props.host,
            this._id,
            this._toggle,
            this._root
        );
    };

    render() {
        return this.props.host ? <View
            {...this.props}
            ref={ele => this._root = ele}
            onLayout={this._onLayout}
        >
            {this.state.visible ? this.props.children : null}
        </View> : <View {...this.props} />;
    }
}

export default LazyloadView;
