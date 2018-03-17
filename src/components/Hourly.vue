<template>
  <div id="hourly">
    <h2>Hourly</h2>
    <ul>
      <li v-for="hour in upcomingHours" v-bind:key="hour.index">
        <h3>{{hour.time}}</h3>
        <p>
          <icon :name="hour.icon" :size="2" :alt="hour.condition"/><br/>
          Temperature: {{hour.temperature}}<br/>
          Wind Speed: {{hour.windSpeed}}<br/>
          Wind Direction: {{hour.windDirection}}<br/>
          Chance of Precipitation: {{hour.pop}}<br/>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import {DateTime} from 'luxon';
import Icon from './Icon.vue';

export default {
  props: ['forecast','location'],
  components: {
    icon: Icon
  },
  computed: {
    upcomingHours() {
      if (this.forecast) {
        return this.forecast
          .slice(0,5)
          .map( hour => {
            const newHour = Object.assign({},hour);
            newHour.time = hour.time
              .setZone(this.location.tz)
              .setLocale('us')
              .toLocaleString(DateTime.TIME_SIMPLE);
            return newHour;
          })
      } else {
        return [];
      }
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

  // #hourly {
  //   overflow: hidden;
  // }

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
