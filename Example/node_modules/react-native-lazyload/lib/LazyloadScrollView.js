import React, {
    Component,
    ScrollView,
    PropTypes
} from 'react-native';

import ContainerManager from './ContainerManager';
import isVisible from './isVisible';

class LazyloadListView extends Component{
    static displayName = 'LazyloadListView';

    static propTypes = {
        name: PropTypes.string,
        offset: PropTypes.number,
        ...ScrollView.propTypes
    };

    static defaultProps = {
        offset: 0
    };

    componentDidMount = () => {
        this._manager = new ContainerManager(this.props.name, React.findNodeHandle(this));
    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.name !== this.props.name) {
            this._manager = new ContainerManager(this.props.name, React.findNodeHandle(this));
        }
    };

    _manager = null;

    _onScroll = e => {
        let {x, y} = e.nativeEvent.contentOffset;
        this._manager.calculate({x, y});
        this.props.onScroll && this.props.onScroll(e);
    };

    _onLayout = e => {
        let {width, height} = e.nativeEvent.layout;
        this._manager.dimension = {width, height};
        this._manager.offset = this.props.offset;
        this.props.onLayout && this.props.onLayout(e);
    };

    render() {
        return <ScrollView
            {...this.props}
            name={null}
            onScroll={this._onScroll}
            onLayout={this._onLayout}
            scrollEventThrottle={this.props.scrollEventThrottle || 16}
        />;
    }
}

export default LazyloadListView;
