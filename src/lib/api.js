import axios from 'axios';
import jsonp from 'jsonp';
import {DateTime} from 'luxon';

const baseUrl="http://api.wunderground.com/api/";
const apiKey="8bb74a9ef12815ec";

export function getConditions(id) {
  const url = `${baseUrl}${apiKey}/conditions/forecast10day/hourly/q/zmw:${id}.json`;
  return axios.get(url)
    .then( response => {
      const wuConditions = response.data.current_observation;
      const wuForecast = response.data.forecast;
      const wuHourly = response.data.hourly_forecast;

      return {
        conditions: formatConditions(wuConditions),
        forecast: formatDailyForecast(wuForecast),
        hourly: wuHourly.map(formatHourlyForecast)
      };
    })
    .catch( err => {
      const error = new Error('Could not connect to weather API.');
      error.name = 'API Error';
      error.code = 1;
      throw error;
    });
}

export function searchLocations(term) {
  const url = `http://autocomplete.wunderground.com/aq?query=${term}`;
  return new Promise( (resolve,reject) => {
    jsonp(url,{param: 'cb'}, (err,data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.RESULTS);
      }
    });
  })
}

function stringToNumber(string,defaultValue=0) {
  const parsed = parseFloat(string);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

function formatHourlyForecast(raw, index) {
  return {
    index,
    time: DateTime.fromMillis(raw.FCTTIME.epoch * 1000),
    temperature: raw.temp.english,
    windSpeed: raw.wspd.english,
    windDirection: raw.wdir.degrees,
    condition: raw.condition,
    icon: raw.icon,
    pop: raw.pop
  }
}

function formatDailyForecast(raw) {
  const text = raw.txt_forecast.forecastday;
  const simple = raw.simpleforecast.forecastday;


  const combined = text.map( day => {
    const data = simple.find( point => point.date.weekday == day.title);
    console.log(data);
  });
git
  return combined;

  // return {
  //   period: raw.period,
  //   weather: raw.icon,
  //   icon: raw.icon_url,
  //   title: raw.title,
  //   text: raw.fcttext
  // }
}

function formatConditions(raw) {
  return {
    date: DateTime.fromRFC2822(raw.local_time_rfc822),
    temperature: stringToNumber(raw.temp_f),
    feelsLike: raw.feelslike_f,
    windSpeed: raw.wind_mph,
    windGust: raw.wind_gust_mph,
    windDirection: raw.wind_degrees,
    pressure: raw.pressure_in,
    pressureTrend: raw.pressure_trend,
    windchil: raw.windchill_f,
    heatIndex: raw.heatIndex_f,
    uv: raw.UV,
    precipLastHr: Math.max(stringToNumber(raw.precip_1hr_in),0),
    precipToday: Math.max(stringToNumber(raw.precip_today_in),0),
    dewPoint: raw.dewpoint_f,
    humidity: raw.relative_humidity,
    visibility: raw.visibility_mi,
    icon: raw.icon
  }
}