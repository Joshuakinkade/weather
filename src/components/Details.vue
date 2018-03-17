<template>
  <div id="details">
    <h2>
      Details
    </h2>
    <ul>
      <li>
        <label>Pressure:</label>
        <span>
          {{conditions.pressure}} in
          <i class="pressure-trend fa" v-bind:class="pressureTrendClass"></i>
        </span>
      </li>
      <li>
        <label>Humidity:</label>
        <span>{{conditions.humidity}}</span>
      </li>
      <li>
        <label>Dewpoint:</label>
        <span>{{conditions.dewPoint}}º</span>
      </li>
      <li>
        <label>UV:</label>
        <span>{{conditions.uv}}</span>
      </li>
      <li>
        <label>Visibility:</label>
        <span>{{conditions.visible}} mi</span>
      </li>
      <li>
        <label>1 Hour Precipitation:</label>
        <span>{{conditions.precipitation1Hr !== undefined ? conditions.precipitation1Hr.toFixed(2) : '--'}} in</span>
      </li>
      <li>
        <label>Precipitation Today:</label>
        <span>{{conditions.precipitationToday !== undefined ? conditions.precipitationToday.toFixed(2) : '--'}} in</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['locationId'],
  computed: {
    conditions() {
      const weather = this.$store.getters.getSelectedWeather(this.locationId) || null;
      return weather && weather.conditions ? weather.conditions : {};
    },
    pressureTrendClass() {
      return {
        'fa-arrow-up': this.conditions.pressureTrend == '+',
        'fa-arrow-down': this.conditions.pressureTrend == '-'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  // #details {
  //   width: 60%;
  //   margin: 0 auto;
  // }

  h2 {
    margin: 0;
    margin-bottom: .25em;
    padding-bottom: .25em;
    border-bottom: solid lightgray 1px;
  }

  ul {
    margin: 1em .5em 0 .5em;
    columns: 2;
    font-size: 1.2em;
  }

  li {
    display: block;
    margin: 0;
    margin-bottom: 1em;

    label {
      font-weight: bold;
    }
  }

  li:last-child {
    margin-bottom: 0;
  }

  .pressure-trend {
    font-size: .8em;
  }
</style>
