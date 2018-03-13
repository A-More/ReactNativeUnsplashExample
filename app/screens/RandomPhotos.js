import React, {Component} from 'react';
import {ImageBackground, Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import api from '../api/randomresource/RandomResource';
import wall from 'react-native-wallpaper-manager';
import RNFetchBlob from 'react-native-fetch-blob';

export default class RandomPhotos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            random: "",
            name: "",
        }
    }

    componentDidMount() {
        api.getRandom()
            .then((res) => {
                this.setState({
                    random: res.urls.regular,
                    name: res.user.name,
                });
            })
    }

    applyWallpaper = () => {
        wall.setWallpaper({uri: this.state.random}, (res) => {
            console.log("set")
        });
        console.log("on hold");
    }

    downloadImage = () => {
        console.log('entered');
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob
            .config({
                // response data will be saved to this path if it has access right.
                path: dirs.PictureDir + '/Screenshots/' + this.state.name +'.png'
            })
            .fetch('GET', this.state.random, {
                //some headers ..
            })
            .then((res) => {
                //
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path())
            })
    };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.downloadImage}
                                  onLongPress={this.applyWallpaper}
                >
                    <ImageBackground style={{width: '100%', height: '100%'}} source={{uri: this.state.random}}
                    >
                        <Text style={styles.options}>{this.state.name}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    options: {
        // flexDirection:'row',
        justifyContent: 'flex-start',
        backgroundColor: '#000000',
        opacity: 0.5,

        // alignSelf: 'flex-end',
        // position: 'absolute',
    }
});