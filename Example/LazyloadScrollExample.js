import React, {
    Component
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    LazyloadScrollView,
    LazyloadView
} from 'react-native-lazyload';

import data from './MOCK_DATA.json';
class LazyloadScrollExample extends Component {
    render() {
        let start = ~~(Math.random() * 900);
        let list = data.splice(start, 100);
        return (
            <LazyloadScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                name="scrollExample"
            >
                {list.map((file, i) => <View
                    key={i}
                    style={styles.view}
                >
                    <LazyloadView
                        host="scrollExample"
                        style={styles.file}
                    >
                        <View style={styles.id}>
                            <Text style={styles.idText}>{file.id}</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={styles.name}>{file.first_name} {file.last_name}</Text>
                            <Text><Text style={styles.title}>email: </Text><Text style={styles.email}>{file.email}</Text></Text>
                            <Text style={styles.ip}><Text style={styles.title}>last visit ip: </Text>{file.ip_address}</Text>
                        </View>
                        <View style={styles.gender}>
                            <Text style={[styles.genderText, file.gender === 'Male' ? styles.male : styles.female]}>{file.gender}</Text>
                        </View>
                    </LazyloadView>
                </View>)}
            </LazyloadScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    content: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    view: {
        height: 70,
        width: 320,
        paddingVertical: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#666'
    },
    file: {
        width: 320,
        flex: 1,
        flexDirection: 'row'
    },
    id: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    idText: {
        fontSize: 10
    },
    detail: {
        justifyContent: 'space-around',
        flex: 1
    },
    name: {
        textAlign: 'center',
        lineHeight: 15,
        color: '#666',
        marginBottom: 5
    },
    email: {
        fontSize: 10,
        color: 'blue',
        textDecorationColor: 'blue',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid'
    },
    ip: {
        fontSize: 12,
        color: 'grey'
    },
    gender: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    genderText: {
        fontSize: 10
    },
    title: {
        color: '#333',
        fontSize: 12
    },
    male: {
        color: 'skyblue'
    },
    female: {
        color: 'pink'
    }
});

export default LazyloadScrollExample;
