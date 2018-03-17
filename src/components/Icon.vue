<template>
  <span class="wi" :class="[mappedName]" :style="{'font-size': `${size}em`}" :title="alt"></span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'clear'
    },
    size: {
      type: Number,
      defaults: 1
    },
    alt: {
      type: String,
      defaults: ''
    }
  },
  computed: {
    mappedName() {
      const map = new Map([
        ['clear','wi-day-sunny'],
        ['cloudy','wi-cloud'],
        ['partlycloudy','wi-day-cloudy'],
        ['mostlycloudy','wi-day-cloudy'],
        ['flurries','wi-snow'],
        ['rain','wi-rain'],
        ['sleet','wi-sleet'],
        ['snow','wi-snow'],
        ['storms','wi-thunderstorm'],
        ['fog','wi-fog'],
        ['hazy','wi-day-haze'],
        ['nt_snow', 'wi-snow'],
        ['nt_partlycloudy','wi-night-partly-cloudy'],
        ['nt_clear','wi-night-clear'],
        ['nt_mostlycloudy','wi-night-partly-cloudy'],
      ]);

      if (map.has(this.name)) {
        return map.get(this.name);
      } else {
        return 'wi-day-sunny'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
