import React, {
    Component,
    View,
    PropTypes
} from 'react-native';

import ContentManager from './ContentManager';

class LazyloadView extends Component{
    static displayName = 'LazyloadView';

    static propTypes = {
        host: PropTypes.string,
        initialVisibility: PropTypes.bool,
        ...View.propTypes
    };

    static defaultProps = {
        initialVisibility: false
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

    _setManager = () => {
        this._manager = new ContentManager(
            this.props.host,
            React.findNodeHandle(this),
            () => {
                this.setState({
                    visible: true
                });
            },
            () => {
                this.setState({
                    visible: false
                });
            }
        );
    };

    _manager = null;

    _root = null;

    _onLayout = (e) => {
        this._manager.layout(this._root);
        this.props.onLayout && this.props.onLayout(e);
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
