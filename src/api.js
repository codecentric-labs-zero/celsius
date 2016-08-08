var moment = require('moment');

const apiUrl = 'http://rhmzrs.com/feeds/json-trenutni-meteo-podaci.json?lokacija=';

export function getTemperature(cityId) {
  return fetch(apiUrl + cityId)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      return {
        lastFetch: moment(),
        termin: responseData.termin,
        temperatura: responseData.temperatura,
        isLoaded: true,
        poruka: null
      }
    });
}
