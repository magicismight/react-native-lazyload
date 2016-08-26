import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';

import Modal from 'react-native-root-modal';
const hairline = StyleSheet.hairlineWidth;

import LazyloadScrollExample from './LazyloadScrollExample';
import LazyloadListExample from './LazyloadListExample';
import LazyloadImageExample from './LazyloadImageExample';

class Example extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            modal: false,
            scale: new Animated.Value(0),
            content: null
        };
    }

    show = (example) => {
        if (this.state.modal) {
            return;
        }

        this.state.scale.setValue(0);
        Animated.spring(this.state.scale, {
            toValue: 1,
            useNativeDriver: true
        }).start();

        this.setState({
            modal: true,
            content: example
        });
    };

    hide = () => {
        this.state.scale.setValue(1);
        Animated.timing(this.state.scale, {
            toValue: 0,
            easing: Easing.in(Easing.back(2))
        }).start(({finished}) => finished && this.setState({
            modal: false,
            content: null
        }));
    };

    render() {
        return <View
            style={styles.container}
        >
            <Text style={styles.welcome}>
                SVG library for React Native
            </Text>
            <View style={styles.contentContainer}>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#aaa"
                    onPress={() => this.show(<LazyloadScrollExample />)}
                >
                    <Text>Lazyload ScrollView</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#aaa"
                    onPress={() => this.show(<LazyloadListExample />)}
                >
                    <Text>Lazyload ListView</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#aaa"
                    onPress={() => this.show(<LazyloadImageExample />)}
                >
                    <Text>Lazyload Image</Text>
                </TouchableHighlight>
            </View>
            <Animated.Modal
                visible={this.state.modal}
                style={[styles.modal, {
                    transform: [{scale: this.state.scale}]
                }]}
            >
                <View style={styles.modalContent}>
                    {this.state.content}
                </View>
                <View
                    style={styles.close}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={this.hide}
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeText}>X</Text>
                    </TouchableOpacity>
                </View>
            </Animated.Modal>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        overflow: 'hidden'
    },
    contentContainer: {
        alignSelf: 'stretch',
        borderTopWidth: hairline,
        borderTopColor: '#ccc',
        borderBottomWidth: hairline,
        borderBottomColor: '#ccc',
        paddingHorizontal: 10
    },
    modal: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    modalContent: {
        position: 'absolute',
        top: 30,
        right: 10,
        bottom: 20,
        left: 10,
        backgroundColor: '#fff'
    },
    close: {
        position: 'absolute',
        right: 20,
        top: 40
    },
    closeButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeText: {
        color: '#fff'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    button: {
        backgroundColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('reacNativeLazyload', () => Example);
