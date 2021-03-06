import moment from 'moment';
import * as axios from 'axios';

const apiUrl = 'http://rhmzrs.com/feeds/json-trenutni-meteo-podaci.json?lokacija=';

export default function getTemperature(cityId) {
  return axios.get(apiUrl + cityId, { timeout: 24000 })
    .then((response) => {
      // let responseData = JSON.parse(JSON.stringify(response.data));
      const responseData = response.data;
      return {
        lastFetch: moment(),
        termin: responseData.termin,
        temperatura: responseData.temperatura,
        slika: responseData.slika,
      };
    });
}
