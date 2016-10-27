var moment = require('moment');
import * as axios from 'axios';

const apiUrl = 'http://rhmzrs.com/feeds/json-trenutni-meteo-podaci.json?lokacija=';

export function getTemperature(cityId) {
  return axios.get(apiUrl + cityId, {
    timeout: 9000
  }).then((response) => {
    let responseData = JSON.parse(response.data.trim())
    return {
      lastFetch: moment(),
      termin: responseData.termin,
      temperatura: responseData.temperatura
    }
  })
}
