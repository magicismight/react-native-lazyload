import React, {
    Compoenet,
    Children,
} from 'react-native';



/*
<LazyloadContainer>
    <View>
         <View>
            <View>
                <Image />
            </View>
         </View>
            <Image />
         <View>
            <View>
                <Image />
            </View>
         </View>
    </View>
</LazyloadContainer>

 */

console.log(createClass);

class LazyloadContainer extends Compoenet{
    render() {
        return Children.only(this.props.children);
    }
}

export default LazyloadContainer;
