import React, {
    Component,
    ScrollView,
    PropTypes,
    Dimensions
} from 'react-native';

import LayzloadManager from './LayzloadManager';

class LazyloadListView extends Component{
    static displayName = 'LazyloadListView';

    static propTypes = {
        name: PropTypes.string.isRequired,
        renderDistance: PropTypes.number,
        recycle: PropTypes.bool,
        recycleDistance : PropTypes.number,
        horizontal: PropTypes.bool,
        ...ScrollView.propTypes
    };

    static defaultProps = {
        renderDistance: 0,
        recycle: true,
        recycleDistance: Dimensions.get('window').height * 4,
        horizontal: false
    };

    componentDidMount = () => {
        let {
            name,
            renderDistance,
            recycle,
            recycleDistance
        } = this.props;

        this._manager = new LayzloadManager(
            name,
            React.findNodeHandle(this),
            renderDistance,
            recycle ? recycleDistance : 0,
            this.props.horizontal
        );
    };

    componentWillUnmount = () => {
        this._manager.destroy();
        this._manager = null;
    };

    _manager = null;

    _onLayout = (e, node) => {
        this.props.onLayout && this.props.onLayout(e, node);
        let {width, height} = e.nativeEvent.layout;
        this._manager.dimension = {width, height};
    };

    _onScroll = e => {
        this.props.onScroll && this.props.onScroll(e);
        let {x, y} = e.nativeEvent.contentOffset;
        this._manager.calculate({x, y});
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
