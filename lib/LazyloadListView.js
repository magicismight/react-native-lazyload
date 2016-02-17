import React, {
    Component,
    ListView
} from 'react-native';

import LazyloadScrollView from './LazyloadScrollView';

class LazyloadListView extends Component{
    static displayName = 'LazyloadListView';

    render() {
        return <ListView
            {...this.props}
            renderScrollComponent={props => <LazyloadScrollView {...props} />}
        />;
    }
}

export default LazyloadListView;
