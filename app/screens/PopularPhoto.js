import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import popularResource from '../api/popularresource/PopularResource';
import PopularItem from '../components/PopularItem';

export default class PopularPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curated: [],
        }
    }

    componentDidMount() {
        popularResource.getPopular()
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
                              return <PopularItem row={item}/>
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