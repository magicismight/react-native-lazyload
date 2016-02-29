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
        this._unmounted = true;
        LayzloadManager.remove(this.props.host, this._id);
    };

    shouldComponentUpdate = (nextProps) => {
        return this._visible || !nextProps.host;
    };

    _root = null;
    _visible = false;
    _timeout = null;
    _unmounted = null;

    _toggle = visible => {
        if (this._visible !== visible && !this._unmounted) {
            this._visible = visible;
            clearTimeout(this._timeout);
            if (this._visible) { // into visible
                this._timeout = setTimeout(() => {
                    if (!this._unmounted) {
                        this.props.animation && LayoutAnimation.configureNext(this.props.animation);
                        this.setState({
                            visible
                        });
                    }
                }, 16);
            } else { // into invisible
                this.setState({
                    visible
                });
            }
        }
    };

    _onLayout = (...args) => {
        if (this._unmounted) {
            return;
        }

        this.props.onLayout && this.props.onLayout(...args);
        setTimeout(() => LayzloadManager.add(
            this.props.host,
            this._id,
            this._toggle,
            this._root
        ));
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
