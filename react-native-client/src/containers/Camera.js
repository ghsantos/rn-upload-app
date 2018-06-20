/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Spinner from 'react-native-loading-spinner-overlay';

import { url } from '../api';

export default class Camera extends Component {
  static navigationOptions = { header: null };

  state = {
    spinnerVisible: false,
  }

  takePicture = async function () {
    this.setState({ spinnerVisible: true });

    if (this.camera) {
      try {
        const options = { quality: 0.5, base64: true };
        const imageData = await this.camera.takePictureAsync(options);
        console.log(imageData);

        const formData = new FormData();
        formData.append('latitude', '10');
        formData.append('longitude', '10');
        formData.append('image', {
          uri: imageData.uri,
          type: 'image/jpeg',
          name: `IMG_${new Date().toJSON()}`
        });

        const res = await fetch(`${url}/images`, {
          method: 'post',
          body: formData
        });

        this.setState({ spinnerVisible: false });
        Alert.alert('Upload concluído');

        console.log(res)
      } catch (e) {
        console.log(e);

        this.setState({ spinnerVisible: false });
        Alert.alert('Erro ao fazer upload');
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Spinner
          visible={this.state.spinnerVisible}
          textContent={"Fazendo Upload da foto..."}
          textStyle={{color: '#FFF'}}
        />

        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
