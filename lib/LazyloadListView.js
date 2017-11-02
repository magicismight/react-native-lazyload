import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import ScrollableMixin from 'react-native-scrollable-mixin';

import LazyloadScrollView from './LazyloadScrollView';

class LazyloadListView extends Component{
    static displayName = 'LazyloadListView';

    static propTypes = {
        ...ListView.propTypes
    };

    refresh () {
        this._scrollView.refresh();
    }

    get scrollProperties() {
        return this._listView.scrollProperties;
    };

    /**
     * IMPORTANT: You must return the scroll responder of the underlying
     * scrollable component from getScrollResponder() when using ScrollableMixin.
     */
    getScrollResponder() {
        return this._listView.getScrollResponder();
    }

    setNativeProps(props) {
        this._listView.setNativeProps(props);
    }

    render() {
        return this.props.name ? <ListView
            {...this.props}
            renderScrollComponent={props => <LazyloadScrollView {...props} />}
            ref={ele => this._listView = ele}
        /> : <ListView
            {...this.props}
            ref={ele => this._listView = ele}
        />;
    }
}

// Mix in ScrollableMixin's methods as instance methods
Object.assign(LazyloadListView.prototype, ScrollableMixin);

export default LazyloadListView;
