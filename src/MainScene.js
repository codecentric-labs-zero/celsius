import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  Image,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

var moment = require('moment');
require('moment/locale/sr');

import { getTemperature } from './api';
const banjaluka = 14542;

export default class MainScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      lastFetch: moment(),
      termin: '',
      temperatura: '',
      poruka: null
    }
    // this.getTemperature();
  }

  componentDidMount() {

    getTemperature(banjaluka)
      .then((data) => {
        console.log(data);
        this.setState(data);
      })


      delay(2000).then(() => {
        this.setState({
          isLoaded: true
        });
      })

  }

  randomTemp() {
    return Math.floor(Math.random() * 30) + 20
  }

  refresh() {
    this.setState({
      isLoaded: false
    });
    console.log('time: ' + this.state.lastFetch);
    if (moment() - this.state.lastFetch > 10000) { // 10 sec
      this.componentDidMount();
    } else {
      console.log('nije proslo dovoljno vremena');
      this.setState({
        isLoaded: true,
        poruka: 'Pokušajte kasnije'
      });
    }
  }

  calculateAgo(time) {
    // 19.07.2016 10:00
    moment.locale('sr');
    var measureTime = moment(time, "DD.MM.YYYY HH:mm");
    return moment(measureTime).fromNow(true);
  }

  renderBody() {
    if (this.state.isLoaded) {
      return (
        <View>
          <Text style={styles.text}>
            Banja Luka
          </Text>
          <Text style={[styles.text, styles.temp]}>
            { this.state.temperatura } °C
          </Text>
          <Text style={[styles.text, styles.ago]}>
            prije { this.calculateAgo(this.state.termin) }
          </Text>
          <TouchableHighlight onPress={this.refresh.bind(this)} style={styles.buttonRefresh}>
            <Image source={require('../assets/refresh.png')} style={styles.imageRefresh} />
          </TouchableHighlight>
          <Text style={[styles.text, styles.ago]}>
            {this.state.poruka ? this.state.poruka : ''}
          </Text>
        </View>
      )
    } else {
      return (
        <ActivityIndicator size="large" />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/vlada_rs.png')} style={styles.image}>
          </Image>
          <Text style={styles.title}>
            Republički hidrometeorološki zavod Republike Srpske
          </Text>
        </View>
        <View style={styles.content}>
          { this.renderBody() }
        </View>
      </View>
    )
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'rgba(0,0,0,.3)'
    backgroundColor: '#66A6CC'
    //justifyContent: 'center',
    //alignItems: 'center',
    //width: null,
    //height: null,
  },
  header: {
    //flexDirection: 'row'
    //flex: 0.5,
  },
  image: {
    //flex: 0.5,
    alignSelf: 'flex-end',
    //opacity: 0.7,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontStyle: 'italic',
    color: '#FFFFFF',
    textAlign: 'center',
    margin: 10,
    //top: -80,
    //backgroundColor: 'rgba(0,0,0,.3)',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(1,1,1,0.9)'
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    //backgroundColor: 'rgba(125,125,125,.4)',
    margin: 2,
    textAlignVertical: 'center'
  },
  temp: {
    fontSize: 45,
    fontWeight: '600'
    //height: 40,
  },
  ago: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 13,
    height: 20,
    //lineHeight: 15
  },
  buttonRefresh: {
    height: 32,
    width: 96,
    alignSelf: 'center',
    //borderColor: '#93CDF5',
    //borderWidth: 2,
    //backgroundColor: '#777777',
    margin: 15,
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  imageRefresh: {
    //margin: 20,
    alignSelf: 'center',
    height: 32,
    //width: 24
  }
});
