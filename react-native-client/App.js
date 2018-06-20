/**
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from './src/containers/Home';
import Camera from './src/containers/Camera';
import ImageScreen from './src/containers/ImageScreen';

const RootStack = createStackNavigator({
  Home: {
    screen: Home
  },
  Camera: {
    screen: Camera
  },
  ImageScreen: {
    screen: ImageScreen
  },
});

export default class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}
