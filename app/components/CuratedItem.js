import React, {Component} from 'react';
import {Image, StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';

const {height, width} = Dimensions.get('window');

export default class CuratedItem extends Component {

    render() {
        console.log("curated Item", this.props.row.urls.small);
        const{navigation}=this.props;
        return (
            <TouchableOpacity style={styles.container}
                              onPress={() => {
                                navigation.navigate('ImageScreen', this.props.row.urls.regular)
                              }}
            >
                <Image style={styles.image} source={{uri: this.props.row.urls.regular}}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: width,
        height: height,
    },
});

