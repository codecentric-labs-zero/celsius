import React, { Component } from 'react';
import { ActivityIndicator, Image, Text, TouchableHighlight, View } from 'react-native';
import moment from 'moment';
import styles from './style';
import getTemperature from './api';

require('moment/locale/sr');

const banjaluka = 14542;
const WAITING_TIME = 10000;

export default class MainScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      lastFetch: moment(),
      termin: '',
      temperatura: '',
      poruka: null,
      slika: null,
    };
  }

  componentDidMount() {
    const that = this;
    getTemperature(banjaluka)
      .then((data) => {
        that.setState({ ...data, isLoaded: true, poruka: null });
      })
      .catch((err) => {
        console.error(err);
        that.setState({
          isLoaded: true,
          lastFetch: moment(),
          termin: '',
          temperatura: '',
          poruka: 'Greška',
          slika: null,
        });
      });
  }

  refresh() {
    this.setState({ isLoaded: false });
    if (moment() - this.state.lastFetch > WAITING_TIME) { // 10 sec
      this.componentDidMount();
    } else {
      this.setState({
        isLoaded: true,
        poruka: 'Pokušajte kasnije',
      });
    }
  }

  calculateAgo(time) {
    // 19.07.2016 10:00
    moment.locale('sr');
    const measureTime = moment(time, 'DD.MM.YYYY HH:mm');
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
          {this.state.slika && <View>
            <Image resizeMode="contain"
                   style={{ height: 120 }}
                   source={{ uri: `http://rhmzrs.com/assets/components/met_Prognoza/${this.state.slika}` }}
            />
          </View>}
        </View>
      );
    } else {
      return (
        <ActivityIndicator size="large" />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/vlada_rs.png')} style={styles.image} />
          <Text style={styles.title}>
            Republički hidrometeorološki zavod Republike Srpske
          </Text>
        </View>
        <View style={styles.content}>
          { this.renderBody() }
        </View>
      </View>
    );
  }
}

