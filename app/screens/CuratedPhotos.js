import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import curatedResource from '../api/curatedresource/CuratedResource';
import CuratedItem from '../components/CuratedItem';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class CuratedPhotos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            curated: [],
        }
    }

    componentDidMount() {
        this.refs.toast.show('scroll up for more', DURATION.FOREVER);
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
});