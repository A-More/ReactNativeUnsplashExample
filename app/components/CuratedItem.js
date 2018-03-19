import React, {Component} from 'react';
import {Image, StyleSheet, Text, Dimensions, TouchableOpacity, Animated, ImageBackground} from 'react-native';
import wall from 'react-native-wallpaper-manager';
import RNFetchBlob from 'react-native-fetch-blob';

const {height, width} = Dimensions.get('window');
let callback ;

export default class CuratedItem extends Component {

    constructor(props) {
        super(props)
        callback  = this.props.callback;
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
        // this.refs.toast.show('setting wallpaper...');
        this.props.callback(3)
        wall.setWallpaper({uri: this.props.row.urls.regular}, (res) => {
            console.log("set")
            // this.refs.toast.show('this image is now your wallpaper');
            this.props.callback(4)
        });
    }

    onPress = () => {
        var delta = new Date().getTime() - this.state.lastPress;

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
        this.props.callback(1)
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob
            .config({
                // response data will be saved to this path if it has access right.
                path: dirs.DownloadDir +'/'+ this.props.row.user.username + '.jpg'
            })
            .fetch('GET', this.props.row.urls.regular, {
                //some headers ..
            })
            .then((res) => {
                this.props.callback(2)
                // this.refs.toast.show('image saved');
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path())
            })
    };

    render() {
        console.log("curated Item", this.props.row.urls.small);
        return (
            <TouchableOpacity style={styles.container}
                              onPress={this.onPress}
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
