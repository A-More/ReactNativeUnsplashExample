import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';

export default class ImageScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            url:this.props.navigation.state.params,
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Image style={{width:'100%', height:'100%'}} source={{uri: this.state.url}}/>
            </View>
        );
    }
}