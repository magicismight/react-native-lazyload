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
    View,
    ListView
} from 'react-native';

import {
    LazyloadListView,
    LazyloadView
} from 'react-native-lazyload';

import data from './MOCK_DATA.json';
class LazyloadListExample extends Component {
    constructor() {
        super(...arguments);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data)
        };
    }

    renderRow = (file) => {
        return <View
            style={styles.view}
        >
            <LazyloadView
                host="listExample"
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
        </View>;
    };

    render() {
        return (
            <LazyloadListView
                style={styles.container}
                contentContainerStyle={styles.content}
                name="listExample"
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                scrollRenderAheadDistance={200}
                renderDistance={100}
                pageSize={1}
                initialListSize={10}
            />
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

export default LazyloadListExample;
