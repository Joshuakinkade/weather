import axios from 'axios';
import jsonp from 'jsonp';
import moment from 'moment';

export default class Weather {
  constructor(options) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl;
  }

  getConditions() {
    const url = `${baseUrl}${apiKey}/conditions/forecast/hourly/q/zmw:${id}.json`;
  }


}