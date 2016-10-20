var moment = require('moment');
import * as axios from 'axios';

const apiUrl = 'http://rhmzrs.com/feeds/json-trenutni-meteo-podaci.json?lokacija=';

export function getTemperature(cityId) {
  console.log('running getTemperature')
  return axios.get(apiUrl + cityId, {
    timeout: 5000
  }).then((response) => {
    console.log("Response data:")
    console.log(response.data)
    let responseData = JSON.parse(response.data.trim())
    return {
      lastFetch: moment(),
      termin: responseData.termin,
      temperatura: responseData.temperatura
    }
  })
}
