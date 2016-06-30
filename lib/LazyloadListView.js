import React, {
    Component,
    PropTypes
} from 'react';
import {
    ListView
} from 'react-native';
import ScrollableMixin from 'react-native-scrollable-mixin';
import LazyloadScrollView from './LazyloadScrollView';

class LazyloadListView extends Component{
    static displayName = 'LazyloadListView';

    static propTypes = {
		...ListView.propTypes,
		renderScrollComponent: PropTypes.func.isRequired
	};

	/**
	* IMPORTANT: You must return the scroll responder of the underlying
	* scrollable component from getScrollResponder() when using ScrollableMixin.
	*/
	getScrollResponder() {
		return this._scrollView.getScrollResponder();
	}

	setNativeProps(props) {
		this._scrollView.setNativeProps(props);
	}

    render() {
        return this.props.name ? <ListView
            {...this.props}
            renderScrollComponent={props => <LazyloadScrollView {...props} ref={component => this._scrollView = component} />}
        /> : <ListView {...this.props} />;
    }
}

// Mix in ScrollableMixin's methods as instance methods
Object.assign(LazyloadListView.prototype, ScrollableMixin);

export default LazyloadListView;
