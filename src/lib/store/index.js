import Vue from 'vue';
import Vuex,{Store} from 'vuex';

import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export const store = new Store({
  state: {
    // Config
    apiKey: '8bb74a9ef12815ec',
    defaultLocation: '84070.1.99999',
    selectedLocation: '84070.1.99999',
    locations: [],

    // UI state
    isUpdatingWeather: false,
    error: null,

    // Weather
    weather: []
  },
  strict: true,
  mutations,
  actions,
  getters: {
    getSelectedLocation(state) {
      return (locationId) => {
        return state.locations.find(l => l.id === locationId) || null;
      }
    },
    getSelectedWeather(state) {
      return (locationId) => {
        return state.weather.find(w => w.locationId === locationId) || null;
      }
    },
    getError(state) {
      return state.error || null;
    }
  }
});