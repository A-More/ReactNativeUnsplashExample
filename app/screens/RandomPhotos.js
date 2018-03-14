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


    //use setTimeout for tutorial

    componentDidMount() {

        this.getRandomPhoto();
        this._interval = setInterval(() => {
            // Your code
            // this.getRandomPhoto();   //uncomment this
        }, 5000);
    }


    componentWillUnmount() {
        clearInterval(this._interval);
    }

    getRandomPhoto = () => {
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
                path: dirs.PictureDir + '/Screenshots/' + this.state.name + '.png'
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
                                  onLongPress={this.applyWallpaper}>
                    <ImageBackground style={styles.image} source={{uri: this.state.random}}>
                        <View style={styles.hintContainer}>
                            <Text style={styles.tutorial}>Click to download</Text>
                            <Text style={styles.tutorial}>Hold to set as Wallpaper</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.option}>{this.state.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%', height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    options: {
        backgroundColor: '#000000',
        opacity: 0.5,
        // alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 0,
    },
    tutorial: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    hintContainer: {
        backgroundColor: '#000000',
        opacity: 0.5,
        borderWidth: 2,
        borderColor: 'white',
        margin: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    }
});