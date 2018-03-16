import React, {Component} from 'react';
import {
    ImageBackground,
    Text,
    View,
    StyleSheet,
    Button,
    ActivityIndicator,
    TouchableOpacity,
    Animated,
} from 'react-native';
import api from '../api/randomresource/RandomResource';
import wall from 'react-native-wallpaper-manager';
import RNFetchBlob from 'react-native-fetch-blob';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export default class RandomPhotos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            random: "",
            name: "",
            message: "",
            fadeAnim: new Animated.Value(.5)
        }
    }


    //use setTimeout for tutorial
    componentDidMount() {

        this.getRandomPhoto();
        this._interval = setInterval(() => {
            // Your code
            // this.getRandomPhoto();   //uncomment this
        }, 5000);
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 3000,
            delay:5000,
        }).start();
    }


    componentWillUnmount() {
        clearInterval(this._interval);
    }

    fadeAnimation = () => {

    }

    getRandomPhoto = () => {
        api.getRandom()
            .then((res) => {
                this.setState({
                    random: res.urls.regular,
                    name: res.user.name,
                    loading: false,
                });
            })
    }

    applyWallpaper = () => {
        wall.setWallpaper({uri: this.state.random}, (res) => {
            console.log("set")
            this.setState({
                message: "Wallpaper Set"
            })
        });
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

                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path())
            })
    };

    renderImage = () => {
        return (
            <View>
                <Text style={styles.hintContainer}>
                    {this.state.message}
                </Text>
            </View>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#000000',
                }}>
                    <ActivityIndicator size='small' color='#ffffff'/>
                </View>
            )
        }
        return (
            <View>
                <TouchableOpacity onPress={this.downloadImage}
                                  onLongPress={this.applyWallpaper}>
                    <ImageBackground style={styles.image} source={{uri: this.state.random}}>
                        <Animated.View style={[styles.hintContainer, {
                            opacity: this.state.fadeAnim,
                        }]}>
                            <Text style={styles.tutorial}>Click to download</Text>
                            <Text style={[styles.tutorial, {marginTop: 10}]}>Hold to set as Wallpaper</Text>
                        </Animated.View>

                    </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.options}>{this.state.name}</Text>
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
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    hintContainer: {
        backgroundColor: '#000000',
        borderWidth: 2,
        borderColor: 'white',
        margin: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    }
});