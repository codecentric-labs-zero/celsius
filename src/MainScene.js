import React, { Component } from 'react';
import { ActivityIndicator, Image, Modal, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import Realm, { HistorySchemaDAO } from './db';
import moment from 'moment';
import styles from './style';
import getTemperature from './api';

require('moment/locale/sr');

const banjaluka = 14542;
const WAITING_TIME = 10000;
let cities = [];
cities[14542] = 'Banja Luka';
cities[14545] = 'Mrkonjić Grad';

export default class MainScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      modalVisible: false,
      lastFetch: moment(),
      termin: '',
      temperatura: '',
      poruka: null,
      slika: null,
      history: [],
    };
  }

  componentDidMount() {
    const that = this;
    getTemperature(banjaluka)
      .then((data) => {
        that.setState({ ...data, isLoaded: true, poruka: null });
        const record = {
          cityId: banjaluka,
          temperature: data.temperatura,
          time: data.termin,
        };
        HistorySchemaDAO.addHistoryRecord(Realm, record);
        const history = HistorySchemaDAO.getHistoryRecords(Realm);
        this.setState({ history });
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

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
        <View style={styles.contentBody}>
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
        </View>)
    } else {
      return (
        <View style={styles.contentBody}>
          <ActivityIndicator size="large" />
        </View>
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
          <View style={{ alignSelf: 'flex-end' }}>
            <TouchableHighlight onPress={() => { this.setModalVisible(true); }}>
              <Text style={styles.modalBtn}>Show History</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View>
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert('Modal has been closed.');}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>History</Text>
              <TouchableHighlight style={styles.modalCloseBtn}
                                  onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                <Text style={styles.modalCloseLabel}>Close</Text>
              </TouchableHighlight>
            </View>
            <ScrollView>
              <View>
                {this.state.history.map(record => (
                  <View key={record.id} style={styles.recordContainer}>
                    <Text>{record.time}</Text>
                    <Text>{cities[record.cityId]}: {record.temperature} ºC</Text>
                  </View>))}
              </View>
            </ScrollView>
          </Modal>
        </View>
      </View>
    );
  }
}

