import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-redux-router';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
});

class Launch extends Component{
    render() {
        return <View style={styles.container}>
            <TouchableHighlight
                style={styles.button}
                underlayColor="#aaa"
                onPress={Actions.lazyloadScroll}
            >
                <Text>Lazyload ScrollView</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.button}
                underlayColor="#aaa"
                onPress={Actions.lazyloadList}
            >
                <Text>Lazyload ListView</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.button}
                underlayColor="#aaa"
                onPress={Actions.lazyloadImage}
            >
                <Text>Lazyload Image</Text>
            </TouchableHighlight>
        </View>
    }
}

export default Launch;
