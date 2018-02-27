import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import api from '../api/randomresource/RandomResource'

export default class RandomPhotos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            random: "",
        }
    }

    componentDidMount() {
        api.getRandom()
            .then((res) => {
                this.setState({
                    random: res.urls.regular,
                });
                // console.log(res.urls.full);
            })
    }

    render() {
        return (
            <View>
                <Image style={{width:'100%', height:'100%'}} source={{uri: this.state.random}}/>
            </View>
        );
    }
}