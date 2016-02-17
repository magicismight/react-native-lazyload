### react-native-lazyload

------------------------

A \`lazyload\` components suit for React Native.

#### Install

```
npm install react-native-lazyload
```

#### Components

Component           | Description
------------------- | --------------------
LazyloadScrollView  | A lazyload container component based on `ScrollView`
LazyloadListView    | A lazyload container component based on `ListView`
LazyloadView        | Based on View component. This component\`s content won\`t be rendered util it scrolls into sight. It should be inside a `LazyloadScrollView` or `LazyloadListView` which has the same `name` prop as this component\`s host prop.
LazyloadImage       | Based on Image component. The image content won\`t be rendered util it scrolls into sight. It should be inside a `LazyloadScrollView` or `LazyloadListView` which has the same `name` prop as this component\`s host prop.

#### Usage

##### LazyloadScrollView

1. Using `LazyloadScrollView` instead of `ScrollView`, and specify a unique id for `name` prop.
2. Layout the views or images which will be lazyloaded by using `LazyloadView` and `LazyloadImage` instead of `View` or `Image`.
3. Specify `host` prop for every `LazyloadView` and `LazyloadImage`, the `host` prop should be same as outer `LazyloadScrollView` component`s name prop.

```
import React, {
    Component
} from 'react-native';

import {
    LazyloadScrollView,
    LazyloadView,
    LazyloadImage
} from 'react-native-lazyload';

const list = [...list data here]; // many rows

class LazyloadScrollViewExample extends Component{
    render() {
        return (
            <LazyloadScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                name="lazyload-list"
            >
                {list.map((file, i) => <View
                    key={i}
                    style={styles.view}
                >
                    <LazyloadView
                        host="lazyload-list"
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
                    </LazyloadView>
                    <View style={styles.avatar}>
                        <LazyloadImage
                            host="lazyload-list"
                            style={styles.avatarImage}
                            source={file.avatar}
                        />
                    </View>
                </View>)}
            </LazyloadScrollView>
        );
    }
}

```

##### LazyloadListView

Same as ListView. But it won\`t  render `LazyloadView` and `LazyloadImage` inside it, util they are scrolled into sight.

#### Run Example

Clone this repository from Github and cd to 'Example' directory then run `npm install`.

