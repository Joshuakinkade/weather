<template>
  <div id="forecast-view">
    <hourly :forecast="hourly" :location="location"></hourly>
    <forecast :forecast="daily"></forecast>
  </div>
</template>

<script>
import moment from 'moment';

import Forecast from './Forecast.vue';
import Hourly from './Hourly.vue';

export default {
  props: ['locationId'],
  components: {
    forecast: Forecast,
    hourly: Hourly
  },
  mounted() {
  },
  computed: {
    daily() {
      const weather = this.$store.getters.getSelectedWeather(this.locationId);
      return weather && weather.dailyForecast ? weather.dailyForecast : [];
    },
    hourly() {
      const weather = this.$store.getters.getSelectedWeather(this.locationId);
      return weather && weather.hourlyForecast ? weather.hourlyForecast : [];
    },
    location() {
      return this.$store.getters.getSelectedLocation(this.locationId) || null;
    }
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    margin: 0;
    margin-bottom: .25em;
    padding-bottom: .25em;
    border-bottom: solid lightgray 1px;
  }

  #forecast {
    overflow: hidden;
  }

  ul {
    display: flex;
    margin: 0;
  }

  li {
    flex: 1;
    min-height: 12em;
    padding: .5em;
    border-radius: .5em;

    &.today {
      background-color: #cef;
    }

    &:first-child {
      margin-left: 0em;
    }

    p {
      margin: 0;
    }

    h3 {
      margin: 0;
      margin-bottom: .25em;
    }

    img {
      vertical-align: text-top;
      float:left;
      margin: .25em;
    }
  }
</style>


