import moment from 'moment';
import * as axios from 'axios';

const apiUrl = 'http://rhmzrs.com/feeds/json-trenutni-meteo-podaci.json?lokacija=';

export function getTemperature(cityId) {
  return axios.get(apiUrl + cityId, {
    timeout: 9000
  }).then((response) => {
    // let responseData = JSON.parse(JSON.stringify(response.data));
    const responseData = response.data;
    console.log("responseData", responseData);
    return {
      lastFetch: moment(),
      termin: responseData.termin,
      temperatura: responseData.temperatura,
      slika: responseData.slika
    };
  });
}
