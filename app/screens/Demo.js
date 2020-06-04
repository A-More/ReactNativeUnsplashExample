import React,{Component} from 'react'
import {Image, StyleSheet, ImageBackground} from 'react-native'

export default class Demo extends Component{

     img;
    constructor(props){
        super(props)
        // img = require('http://www.reactnativeexpress.com/logo.png')
    }
    render() {
        return (
            <ImageBackground
                style={styles.image}
                source={{uri: 'http://www.reactnativeexpress.com/logo.png'}}
                // source={img}
                onLoadEnd={()=>{console.log("onLoadEnd")}}
            />
        )
    }
}
const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
})

