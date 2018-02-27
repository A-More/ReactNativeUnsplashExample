import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import curatedResource from '../api/curatedresource/CuratedResource';
import CuratedItem from '../components/CuratedItem';

export default class CuratedPhotos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curated: [],
        }
    }

    componentDidMount() {
        curatedResource.getCurated()
            .then((res) => {
                this.setState({
                    curated: res,
                })
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