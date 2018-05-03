import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Animated, Text} from 'react-native';
import curatedResource from '../api/curatedresource/CuratedResource';
import CuratedItem from '../components/CuratedItem';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class CuratedPhotos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            fadeAnim: new Animated.Value(.5),
            curated: [],
        }
    }

    componentDidMount() {
        this.refs.toast.show('scroll up for more', DURATION.FOREVER);
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 3000,
            delay: 5000,
        }).start();
    }

    getCuratedPhotos = () => {
        curatedResource.getCurated(this.state.page)
            .then((res) => {
                this.setState({
                    curated: [...this.state.curated, ...res],
                })
            })
    }

    loadMore = () => {
        this.setState({
                page: this.state.page + 1
            }, () => {
                this.getCuratedPhotos();
            })
    }

    onScroll = () => {
        this.refs.toast.close(1);
    }

    showToast = (flag) => {
        if(flag === 1){
            this.refs.toast.show('downloading...');
        } else if(flag === 2){
            this.refs.toast.show('image saved');
        } else if(flag === 3){
            this.refs.toast.show('setting wallpaper...');
        } else if(flag === 4){
            this.refs.toast.show('this image is now your wallpaper');
        }
    }



    render() {
        // const{navigation}=this.props;
        return (
            <View style={styles.container}>
                <FlatList style={styles.list}
                          data={this.state.curated}
                          keyExtractor={(item) => {
                              return item.id;
                          }}
                          renderItem={({item}) => {
                              return <CuratedItem row={item} callback={this.showToast}/>
                          }}
                          onEndReached={this.loadMore}
                          onEndThreshold={7}
                          onScrollBeginDrag={this.onScroll}
                />
                <View style={{position:'absolute', width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                    <Animated.View style={[styles.hintContainer, {
                        opacity: this.state.fadeAnim,
                    }]}>
                        <Text style={styles.tutorial}>Curated Photos</Text>
                    </Animated.View>
                </View>

                {/*</FlatList>*/}
                <Toast ref="toast"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
        // width:'100%',
        //  height:'100%',
        //  width:300,
        //  height:900,
    },
    hintContainer: {
        backgroundColor: '#000000',
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width:'50%'
    },
    tutorial: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});