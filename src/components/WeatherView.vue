<template>
  <div id="weather-view">
    <page-header :updated-at="weather ? weather.conditions.date : null"
                   :location="location"/>
    <error-bar :error="$store.state.error"/>
    <div class="weather" v-if="weather">
      <conditions :conditions="weather ? weather.conditions : null" :forecast="weather ? weather.dailyForecast[0] : null"></conditions>
      <div class="section-nav">
        <nav>
          <ul>
            <li>
              <router-link active-class="active" :to="`/${locationId}/forecast`">Forecast</router-link>
            </li>
            <li>
              <router-link active-class="active" :to="`/${locationId}/details`">Details</router-link>
            </li>
            <li>
              <router-link active-class="active" :to="`/${locationId}/astronomy`">Astronomy</router-link>
            </li>
          </ul>
        </nav>
      </div>
      <router-view></router-view>
    </div>
    <div v-else>
      <p>
        Loading...
      </p>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import Forecast from './Forecast.vue';
import Hourly from './Hourly.vue';
import Conditions from './Conditions.vue';
import ErrorBar from './ErrorBar.vue';
import {SET_CURRENT_LOCATION} from '../lib/store/types';

export default {
  props: {
    locationId: String,
  },
  data() {
    return {
    }
  },
  beforeRouteEnter(to,from,next) {
    next( vm => {
      vm.$store.dispatch('updateWeather',{locationId: to.params.locationId});
    });
  },
  watch: {
    locationId(newValue) {
      this.$store.dispatch('updateWeather',{locationId: newValue});
    }
  },
  computed: {
    weather() {
      return this.$store.getters.getSelectedWeather(this.locationId) || null;
    },
    location() {
      return this.$store.getters.getSelectedLocation(this.locationId) || null;
    }
  },
  components: {
    'page-header': Header,
    'forecast': Forecast,
    'hourly': Hourly,
    'conditions': Conditions,
    'error-bar': ErrorBar
  }
}
</script>

<style lang="scss" scoped>
  #weather-view {
    width: 60em;
  }

  .section-nav {
    text-align: center;

    li {
      margin: 0 .5em;
    }

    .active {
      font-weight: bold;
    }
  }
</style>


