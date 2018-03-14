import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import popularResource from '../api/popularresource/PopularResource';
import PopularItem from '../components/PopularItem';

export default class PopularPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curated: [],
            page:1,
        }
    }


    componentDidMount() {
        this.getPopularPhotos();
    }

    getPopularPhotos = () => {
        console.log("Current page" + this.state.page)
        popularResource.getPopular(this.state.page)
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
            this.getPopularPhotos();
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
                              return <PopularItem row={item}/>
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