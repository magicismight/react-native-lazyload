/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    LazyloadScrollView,
    LazyloadView
} from 'react-native-lazyload';


class reacNativeLazyload extends Component {
    render() {
        return (
            <LazyloadScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                name="index"
            >
                {Array.apply(null, Array(200)).map((v, i) => <View
                    key={i}
                    style={styles.view}
                >
                    <View>
                        <LazyloadView
                            host="index"
                            style={styles.lazyloadView}
                        >
                            <Text style={styles.text}>line: {i}</Text>
                        </LazyloadView>
                    </View>
                </View>)}
            </LazyloadScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    view: {
        height: 20,
        width: 320,
        backgroundColor: '#333',
        marginBottom: 10
    },
    lazyloadView: {
        height: 15,
        width: 320,
        backgroundColor: 'red'
    },
    text: {
        textAlign: 'center',
        height: 15
    }
});

AppRegistry.registerComponent('reacNativeLazyload', () => reacNativeLazyload);
