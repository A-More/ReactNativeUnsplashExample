/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Router} from './app/utils/Router';
import Demo from "./app/screens/Demo";

export default class App extends Component<Props> {
    render() {
        return (
            <Router/>
        );
    }
}