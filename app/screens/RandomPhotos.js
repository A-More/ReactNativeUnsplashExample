import React, {Component} from 'react';
import {ImageBackground, Text, View, StyleSheet, Button} from 'react-native';
import api from '../api/randomresource/RandomResource';
import wallpaperManager from 'react-native-wallpaper-manager';

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
            })
    }

    setWallpaper = () => {
        // show loading
        // sencond parameter is a callback when done setting wallpaper
        wallpaperManager.setWallpaper({uri: this.state.random}, (res)=>{console.log("set")});
        console.log("on hold");
    }

    render() {
        return (
            <View>
                <ImageBackground style={{width: '100%', height: '100%'}} source={{uri: this.state.random}}
                onLongPress={this.setWallpaper}>
                    <View style={styles.options}>
                        <Button title='set wallpaper' style={{width: 50, height: 50, alignSelf: 'center'}}
                                onPress={() => {
                                    console.log("on click");
                                }}
                                onLongPress={}
                        />
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    options: {
        // flexDirection:'row',
        justifyContent:'center',
        height: '15%',
        backgroundColor: '#000000',
        opacity:0.5,
        // alignSelf: 'flex-end',
        // position: 'absolute',
    }
});