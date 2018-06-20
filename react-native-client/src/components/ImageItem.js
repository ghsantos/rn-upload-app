/* @flow weak */

import React from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { url } from '../api';

const width = Dimensions.get('window').width / 2;

const ImageItem = (props) => (
  <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
    <Image
      style={{ width: '100%', height: '100%' }}
      source={{ uri: `${url}/${props.imageUrl}` }}
    />
  </TouchableOpacity>
);

export default ImageItem;

const styles = StyleSheet.create({
  container: {
    height: width,
    width,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
