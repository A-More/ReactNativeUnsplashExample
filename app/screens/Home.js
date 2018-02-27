import React, {Component} from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import RandomPhotos from './RandomPhotos '
import CuratedPhotos from './CuratedPhotos';
import PopularPhoto from './PopularPhoto';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

const {height} = Dimensions.get('window');
export default class Home extends Component {

    render() {
        return (
            <IndicatorViewPager
                style={{height: height}}
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
        return <PagerDotIndicator pageCount={3}/>;
    }
}

