<template>
  <div id="app">
    <locations v-on:location-changed="handleLocationChange"
               v-on:location-added="handleAddLocation"
                   :locations="$store.state.locations"/>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import moment from 'moment';
import Locations from './components/Locations.vue';
import {PUSH_LOCATION, SET_CURRENT_LOCATION} from './lib/store/types';

export default {
  name: 'app',
  components:{
    'locations': Locations
  },
  data () {
    return {
    }
  },
  methods: {
    handleLocationChange(data) {
      //this.$store.commit(SET_CURRENT_LOCATION,data);
      //this.$store.dispatch('updateWeather');
    },
    handleAddLocation(location) {
      this.$store.commit(PUSH_LOCATION,location);
      //this.$store.commit(SET_CURRENT_LOCATION,location.zmw);
      //this.$store.dispatch('updateWeather');
    },
    handleKeyPress() {
      console.log('hello');
    }
  },
  computed: {
    error() {
      return this.$store.state.error;
    }
  }
}
</script>

<style lang="scss">
html, body {
  height: 100%;
  margin: 0;
  overflow: hidden;
  min-width: 960;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
  align-items: stretch;
  margin: 0 auto;
  max-width: 1024px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: steelblue;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;

  & > div {
    height: 100%;
  }
}

#locations {
  width: 12em;
}

// #page-header {
//   height: 10%;
// }

// #conditions {
//   // height: 20%;
//   // margin-bottom: 5%;
//   // // flex: 1;
// }

#hourly {
  //height: 30%;
  flex: 1;
}

#forecast {
  // height: 30%;
  flex: 1;
}

/* ACCESSIBILITY */

// Hide stuff visually, but not to screen readers
.sr-only {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

</style>
