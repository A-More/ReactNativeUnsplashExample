/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import RandomPhotos from './app/screens/RandomPhotos'
import CuratedPhotos from './app/screens/CuratedPhotos';
import PopularPhoto from './app/screens/PopularPhoto';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const {width, height} = Dimensions.get('window');
type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <IndicatorViewPager
                style={{height:height}}
                indicator={this._renderDotIndicator()}
            >
                <View>
                    <RandomPhotos/>
                </View>
                <View>
                    <CuratedPhotos/>
                </View>
                <View>
                    <PopularPhoto/>
                </View>
            </IndicatorViewPager>
        );
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width:400,
        height:500,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
