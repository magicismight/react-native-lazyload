import React, {
    Component
} from 'react';
import {
    ListView
} from 'react-native';

import LazyloadScrollView from './LazyloadScrollView';

class LazyloadListView extends Component {
    static displayName = 'LazyloadListView';

    constructor(props, context) {
        super(props, context);

        this._setScrollViewRef = this._setScrollViewRef.bind(this);
    }

    get scrollProperties() {
        const { _scrollView } = this;
        if (!_scrollView) { return; }
        return _scrollView.scrollProperties;
    }

    get scrollTo() {
        const { _scrollView } = this;
        if (!_scrollView) { return; }
        return _scrollView.scrollTo;
    }

    _setScrollViewRef(ref) {
        this._scrollView = ref;
    }

    _additionalListViewProps() {
        if (!this.props.name) {
            return {};
        }
        return {
            renderScrollComponent: props => <LazyloadScrollView {...props} />
        };
    }

    render() {
        return <ListView
            {...this.props}
            {...this._additionalListViewProps()}
            ref={this._setScrollViewRef}
        />;
    }
}

export default LazyloadListView;
