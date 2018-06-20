/* @flow */

import React, { Component } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import { url } from '../api';
import ImageItem from '../components/ImageItem';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Galeria',
  };

  state = {
    images: [],
    refreshing: false,
  }

  componentDidMount() {
    this.getImages();
  }

  getImages() {
    this.setState({ refreshing: true });

    fetch(`${url}/images`)
      .then(res => res.json())
      .then(resJson => this.setState({ images: resJson }))
      .catch(err => console.log(err));

    this.setState({ refreshing: false });
  }

  renderItem = ({ item }) => (
    <ImageItem
      id={item.id}
      name={item.name}
      imageUrl={item.prevUrl}
      onPress={() => this.props.navigation.navigate('ImageScreen', item)}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.images}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
            numColumns={2}
            refreshing={this.state.refreshing}
            onRefresh={() => this.getImages()}
          />
        </View>

        <View style={{ height: 40, justifyContent: 'flex-end' }}>
          <Button
            title="Ir para a câmera"
            onPress={() => this.props.navigation.navigate('Camera')}
            style={{ height: '100%' }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
