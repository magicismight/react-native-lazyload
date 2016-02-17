import React, {
    Component,
    View,
    PropTypes,
    LayoutAnimation
} from 'react-native';

import ContentManager from './ContentManager';
let Anim = PropTypes.shape({
    duration: PropTypes.number,
    delay: PropTypes.number,
    springDamping: PropTypes.number,
    initialVelocity: PropTypes.number,
    type: PropTypes.oneOf(['spring', 'linear', 'easeInEaseOut', 'easeIn', 'easeOut', 'keyboard']),
    property: PropTypes.oneOf(['opacity', 'scaleXY'])
});

class LazyloadView extends Component{
    static displayName = 'LazyloadView';

    static propTypes = {
        host: PropTypes.string.isRequired,
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
        this.state = {
            visible: this.props.initialVisibility
        };
    };

    componentDidMount = () => {
        setImmediate(() => this._setManager());
    };

    componentWillReceiveProps = nextProps => {
        nextProps.name !== this.props.name && this._setManager();
    };

    _manager = null;
    _root = null;

    _setManager = () => {
        this._manager = new ContentManager(
            this.props.host,
            React.findNodeHandle(this),
            () => this._toggle(true),
            () => this._toggle(false)
        );
    };

    _toggle = visible => {
        setTimeout(() => {
            this.props.animation && LayoutAnimation.configureNext(this.props.animation);
            this.setState({
                visible
            });
        });
    };

    _onLayout = e => {
        this.props.onLayout && this.props.onLayout(e);
        this._manager.layout(this._root);
    };

    render() {
        return <View
            ref={ele => this._root = ele}
            {...this.props}
            onLayout={this._onLayout}
        >
            {this.state.visible ? this.props.children : null}
        </View>;
    }
}

export default LazyloadView;
