export default class IconMapper {
  constructor() {
    this.map = new Map([
      ['clear','wi-day-sunny'],
      ['cloudy','wi-cloud'],
      ['partlycloudy','wi-day-cloudy'],
      ['mostlycloudy','wi-day-cloduy'],
      ['flurries','wi-snow'],
      ['rain','wi-rain'],
      ['sleet','wi-sleet'],
      ['snow','wi-snow'],
      ['storms','wi-thunderstorm'],
      ['fog','wi-fog'],
      ['hazy','wi-day-haze'],

    ]);
  }

  get(wuIcon,timeOfDay) {
    if (typeof wuIcon !== 'string') {
      return '';
    }

    wuIcon = wuIcon.replace('chance','');
    return this.map.get(wuIcon);
  }
}