import React, {
    Component,
    PropTypes
} from 'react';
import ReactNative, {
    ScrollView,
    Dimensions
} from 'react-native';
import ScrollableMixin from 'react-native-scrollable-mixin';
import LayzloadManager from './LayzloadManager';

class LazyloadListView extends Component{
    static displayName = 'LazyloadListView';

    static propTypes = {
        name: PropTypes.string,
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

    componentWillUnmount = () => {
        if(this._manager){
            this._manager.destroy();
            this._manager = null;
        }
    };

    getScrollResponder = () => this._scrollResponder;

    _manager = null;
    _scrollResponder = null;

    _onLayout = (e, node) => {
        this.props.onLayout && this.props.onLayout(e, node);
        let {width, height} = e.nativeEvent.layout;
        let {
            name,
            renderDistance,
            recycle,
            recycleDistance
        } = this.props;

        this._manager = new LayzloadManager(
            {
                name,
                dimensions: {
                    width,
                    height
                },
                offset: renderDistance,
                recycle: recycle ? recycleDistance : 0,
                horizontal: this.props.horizontal
            },
            ReactNative.findNodeHandle(this)
        );

    };

    _onScroll = e => {
        this.props.onScroll && this.props.onScroll(e);
        let {x, y} = e.nativeEvent.contentOffset;
        this._manager && this._manager.calculate({x, y});
    };

    render() {
        return this.props.name ? <ScrollView
            {...this.props}
            ref={ele => this._scrollResponder = ele}
            name={null}
            onScroll={this._onScroll}
            onLayout={this._onLayout}
            scrollEventThrottle={this.props.scrollEventThrottle || 16}
        /> : <ScrollView
            {...this.props}
            ref={ele => this._scrollResponder = ele}
        />;
    }
}

Object.assign(LazyloadListView.prototype, ScrollableMixin);

export default LazyloadListView;
