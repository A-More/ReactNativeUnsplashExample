import React, {Component} from 'react';
import {Image, StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';

const {height, width} = Dimensions.get('window');

export default class CuratedItem extends Component {

    render() {
        console.log("curated Item", this.props.row.urls.small);
        return (
            <TouchableOpacity style={styles.container}
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

