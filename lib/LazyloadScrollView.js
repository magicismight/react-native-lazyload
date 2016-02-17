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
        name: PropTypes.string.isRequired,
        offset: PropTypes.number,
        recycle: PropTypes.bool,
        ...ScrollView.propTypes
    };

    static defaultProps = {
        recycle: false,
        offset: 0
    };

    componentDidMount = () => {
        this._manager = new ContainerManager(this.props.name, React.findNodeHandle(this), this.props.recycle);
    };

    componentWillUnmount = () => {
        this._manager.destroy();
        this._manager = null;
    };

    _manager = null;

    _onScroll = e => {
        this.props.onScroll && this.props.onScroll(e);
        let {x, y} = e.nativeEvent.contentOffset;
        this._manager.calculate({x, y});
    };

    _onLayout = (e, node) => {
        this.props.onLayout && this.props.onLayout(e, node);
        let {width, height} = e.nativeEvent.layout;
        this._manager.dimension = {width, height};
        this._manager.offset = this.props.offset;
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
