/* @flow */

import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { url } from '../api';

export default class ImageScreen extends Component {
  render() {
    const item = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Image
          style={{ width: '100%', height: '90%' }}
          source={{ uri: `${url}/${item.fullhdUrl}` }}
          resizeMode='contain'
        />
        <Text>{item.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
});
