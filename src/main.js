import Vue from 'vue';
import VueRouter from 'vue-router';
import {store} from './lib/store/';
import App from './App.vue';

import * as types from './lib/store/types';
import Config from './lib/Config';

import HomeView from './components/HomeView.vue';
import ErrorView from './components/ErrorView.vue';
import WeatherView from './components/WeatherView.vue';
import ForecastView from './components/ForecastView.vue';
import AstronomyView from './components/AstronomyView.vue';
import Details from './components/Details.vue';

const config = new Config();

Vue.use(VueRouter);

const routes = [
  {path: '/', component: HomeView},
  {path: '/error', component: ErrorView},
  {path: '/:locationId',
   component: WeatherView,
   props: true,
   children: [
     {path: 'forecast', component: ForecastView, props: true},
     {path: 'details', component: Details, props: true},
     {path: 'astronomy', component: AstronomyView, props: true},
     {path: '/', redirect: 'forecast'}
   ]}
];

const router = new VueRouter({routes});

config.get('savedLocations')
  .then( locations => {
    if (locations) {
      locations.forEach( location => {
        store.commit(types.PUSH_LOCATION,location);
      });
    }

    config.get('defaultLocation')
      .then( location => {
        store.commit(types.SET_CURRENT_LOCATION,location);
        //store.dispatch('updateWeather',{locationId: location});
      });
  })
  .catch( err => {
    console.error(err);
  });

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
