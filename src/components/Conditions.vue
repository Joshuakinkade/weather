<template>
  <div id="conditions">
    <div class="left">
      <temperature :current="safeConditions.temperature" :feels-like="safeConditions.feelsLike" :high="highTemp" :low="lowTemp"/>
    </div>
    <div class="right">
      <div style="text-align: center; flex: 1;" class="icon">
        <icon :name="safeConditions.icon" :alt="safeConditions.icon"/>
      </div>
      <wind :speed="safeConditions.windSpeed" :gust="safeConditions.windGust" :direction="safeConditions.windDirection"/>
    </div>
  </div>
</template>

<script>
import Wind from './Wind.vue';
import Temperature from './Temperature.vue';
import Icon from './Icon.vue';


export default {
  components: {
    'wind': Wind,
    'temperature': Temperature,
    'icon': Icon
  },
  props: {
    conditions: {
      default() {
        return {
          temperature: 66,
          feelsLike: 66,
          conditions: 'clear',
          windSpeed: 7,
          windGust: 10,
          windDirection: 355,
          humidity: 35,
          dewpoint: 42,
          pressure: 24.5,
          heatIndex: 64,
          windChill: null
        }
      }
    },
    forecast: {
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      highTemp: 100,
      lowTemp: 0
    }
  },
  computed: {
    safeConditions() {
      if (this.conditions) {
        return this.conditions;
      }
      return {
        temperature: 66,
        conditions: 'clear',
        windSpeed: 7,
        windDirection: 355,
        humidity: 35,
        dewpoint: 42,
        pressure: 24.5,
        heatIndex: 64,
        windChill: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #conditions {
    display: flex;
    overflow: hidden;
  }

  // .summary {
  //   display: flex;
  //   flex: 1;
  //   margin-right: 1em;
  // }

  .left {
    flex: 1;
    // border-right: solid gray 1px;
  }

  .right {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
  }

  .icon {
    font-size: 6em;
    line-height: 1.5em;
  }
</style>
