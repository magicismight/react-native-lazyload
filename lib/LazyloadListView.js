import React, { Component } from 'react';
import {
    ListView
} from 'react-native';

import LazyloadScrollView from './LazyloadScrollView';

class LazyloadListView extends Component{
    static displayName = 'LazyloadListView';

    render() {
        return this.props.name ? <ListView
            {...this.props}
            renderScrollComponent={props => <LazyloadScrollView {...props} />}
        /> : <ListView {...this.props} />;
    }
}

export default LazyloadListView;
