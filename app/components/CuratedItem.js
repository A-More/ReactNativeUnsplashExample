import React, {Component} from 'react';
import {Image, StyleSheet, Text, Dimensions, TouchableOpacity, Animated, ImageBackground} from 'react-native';
import wall from 'react-native-wallpaper-manager';
import RNFetchBlob from 'react-native-fetch-blob';
import Toast, {DURATION} from 'react-native-easy-toast';

const {height, width} = Dimensions.get('window');

export default class CuratedItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            message: "",
            fadeAnim: new Animated.Value(.5)
        }
    }

    componentDidMount() {
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 3000,
            delay: 5000,
        }).start();
    }

    applyWallpaper = () => {
        this.refs.toast.show('setting wallpaper');
        wall.setWallpaper({uri: this.state.random}, (res) => {
            console.log("set")
            this.refs.toast.show('this image is now your wallpaper');
        });
    }

    downloadImage = () => {
        console.log('entered');
        // this.refs.toast.show('downloading...');
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
                this.refs.toast.show('image saved');
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path())
            })
    };

    render() {
        console.log("curated Item", this.props.row.urls.small);
        const {navigation} = this.props;
        return (
            <TouchableOpacity style={styles.container}
                              onPress={this.downloadImage}
                              onLongPress={this.applyWallpaper}>
                <Image style={styles.image} source={{uri: this.props.row.urls.regular}}/>
                <Text style={styles.options}>{this.props.row.user.name}</Text>
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
