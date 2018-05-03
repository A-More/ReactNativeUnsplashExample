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
    Platform,
    CameraRoll
} from 'react-native';
import api from '../api/randomresource/RandomResource';
import wall from 'react-native-wallpaper-manager';
import RNFetchBlob from 'react-native-fetch-blob';
import Toast, {DURATION} from 'react-native-easy-toast';
let flag = 0;
export default class RandomPhotos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            random: "",
            name: "",
            message: "",
            fadeAnim: new Animated.Value(.5),
            image: null,
        }
        console.log('inside constructor');
    }


    //use setTimeout for tutorial
    componentDidMount() {
        console.log("called or not");
        this.getRandomPhoto();
        this._interval = setInterval(() => {
            // Your code
            this.getRandomPhoto();   //uncomment this
        }, 5000);
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 3000,
            delay: 5000,
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
                    name: res.user.username,
                    loading: false,
                });
                if(flag === 0){
                    flag = 1;
                    this.refs.toast.show('double tap to download\nhold to set wallpaper', DURATION.FOREVER);
                }

                /*fetch(this.state.random).then((res) => {
                    this.setState({
                        image: res,
                    })
                })*/
            })
    }

    applyWallpaper = () => {
        this.refs.toast.show('setting wallpaper');
        wall.setWallpaper({uri: this.state.random}, (res) => {
            console.log("set")
            this.refs.toast.show('this image is now your wallpaper');
        });
    }

    onPress = () => {
        this.refs.toast.close(1);
        var delta = new Date().getTime() - this.state.lastPress;
        console.log('inside onPress')
        if (delta < 200) {
            // double tap happend
            this.downloadImage();
        }
        this.setState({
            lastPress: new Date().getTime()
        })
    }

    downloadImage = () => {
        console.log('entered');
        // this.refs.toast.show('downloading...');
        if(Platform.OS === 'android'){
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob
            .config({
                // response data will be saved to this path if it has access right.
                path: dirs.DownloadDir +'/'+ this.state.name + '.jpg'
                // path: dirs.PictureDir + '/Screenshots/' + this.state.name + '.png'
            })
            .fetch('GET', this.state.random, {
                //some headers ..
            })
            .then((res) => {
                this.refs.toast.show('image saved');
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path())
            })
        } else {
            console.log('inside ios fi block')
            CameraRoll.saveToCameraRoll(this.state.random)
                .then(()=>{console.log('saved')})
                .catch((error) => {console.log(error)})
        }
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
                    width: '100%',
                    height: '100%',
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
                <TouchableOpacity onPress={this.onPress}
                                  onLongPress={this.applyWallpaper}>
                    <ImageBackground style={styles.image} source={{uri: this.state.random}}>
                        <Animated.View style={[styles.hintContainer, {
                        opacity: this.state.fadeAnim,
                        }]}>
                        <Text style={styles.tutorial}>Random</Text>
                        </Animated.View>
                    </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.options} opacity={0.5}>{this.state.name}</Text>
                <Toast ref="toast"/>
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