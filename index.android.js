import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import MainScene from './src/MainScene';

class Celsius extends Component {
  render() {
    return (
      <MainScene />
    );
  }
}


AppRegistry.registerComponent('Celsius', () => Celsius);
