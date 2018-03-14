import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import curatedResource from '../api/curatedresource/CuratedResource';
import CuratedItem from '../components/CuratedItem';

export default class CuratedPhotos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            curated: [],
        }
    }

    componentDidMount() {

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

    render() {
        return (
            <View style={styles.container}>
                <FlatList style={styles.list}
                          data={this.state.curated}
                          keyExtractor={(item) => {
                              return item.id;
                          }}
                          renderItem={({item}) => {
                              return <CuratedItem row={item}/>
                          }}
                          onEndReached={this.loadMore}
                          onEndThreshold={7}
                />
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