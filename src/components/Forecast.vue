<template>
  <div id="forecast">
    <header>
      <h2>Forecast</h2>
      <div class="toggle">
        <button :class="{active: length === 3}" @click="setLength(3)">3 Day</button>
        <button :class="{active: length === 7}" @click="setLength(7)">10 Day</button>
      </div>
    </header>
    <main>
    <ul>
      <li v-for="day in forecastDays" v-bind:key="day.period + 1">
        <h3>{{day.title}}</h3>
        <p>
          <span class="icon">
            <icon :name="day.weather" :size="2"/>
          </span>
          {{day.text}}
        </p>
      </li>
    </ul>
    </main>
  </div>
</template>

<script>
import {DateTime} from 'luxon';
import moment from 'moment';
import Icon from './Icon.vue';

export default {
  props: ['forecast'],
  components: {
    icon: Icon
  },
  data(){
    return {
      length: 3
    }
  },
  methods: {
    setLength(length) {
      this.length = length;
    }
  },
  computed: {
    forecastDays() {
      const now = DateTime.local();
      let forecast = this.forecast;

      if (this.forecast && this.forecast.length > 0) {
        if (this.forecast[0].title == now.toString('cccc')) {
          if (now.hours() > 18) { // Don't show today's forecast after 6 PM
            forecast = forecast.slice(1);
          }
        }

        let displayDays = [];
        if (this.length == 3) {
          displayDays = forecast.slice(0,6);
        } else if (this.length == 7) {
          displayDays = forecast
            .slice(0,14);
        }

        return displayDays;
      }
      return [];
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    margin-bottom: .25em;
    padding-bottom: .25em;
    border-bottom: solid lightgray 1px;
    display: flex;
  }

  h2 {
    margin: 0;
    margin-right: .5em;
  }

  .toggle {
    display: flex;
    padding: .5em 0;

    & button {
      background-color: transparent;
      outline: none;
      float: left;
      border-color: steelblue;

      &:active {
        background-color: lightsteelblue;
        border-color: steelblue;
      }

      &.active {
        background-color: lightsteelblue;
        margin: 0;
      }

      &:first-child {
        border-top-left-radius: .5em;
        border-bottom-left-radius: .5em;
        border-right: none;
      }

      &:last-child {
        border-top-right-radius: .5em;
        border-bottom-right-radius: .5em;
      }
    }
  }

  #forecast {
    overflow: hidden;
    width: 100%;

    main {
      width: 100%;
    }
  }

  ul {
    margin: 0;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    width: 100%;
  }

  li {
    padding: .5em;
    border-radius: .5em;
    display: inline-block;
    vertical-align: text-top;
    white-space: normal;
    width: 20%;

    &.today {
      background-color: lightsteelblue;
    }

    &:first-child {
      margin-left: 0em;
      background-color: lightsteelblue;
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

  .icon {
    vertical-align: text-top;
    float: left;
    margin: 0 .5em;
  }
</style>
