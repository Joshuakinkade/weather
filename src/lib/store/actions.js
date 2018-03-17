import {getConditions} from '../api';
import Config from '../Config';
import {TOGGLE_IS_UPDATING_WEATHER,SET_DEFAULT_LOCATION,SET_ERROR,SAVE_LOCATiON,UNSAVE_LOCATION,SET_WEATHER,SET_CURRENT_LOCATION} from './types';

const config = new Config();

export default {
  updateWeather({commit,getters},{locationId}) {
    commit(TOGGLE_IS_UPDATING_WEATHER);
    getConditions(locationId)
      .then( data => {
        commit(SET_WEATHER,{
          locationId:locationId,
          conditions:data.conditions,
          dailyForecast: data.forecast,
          hourlyForecast: data.hourly
        });
        commit(TOGGLE_IS_UPDATING_WEATHER);
      })
      .catch( err => {
        if (typeof err.tries == 'undefined') {
          err.tries == 0;
        } else {
          err.tries += 1;
        }
        commit(SET_ERROR,{error:err});
      });
  },
  saveLocation({commit,getters}, location) {
    commit(SAVE_LOCATiON,location.id);
    config.set('savedLocations',this.state.locations.filter( location => location.isSaved));
  },
  setLocation({commit}, location) {
    commit(SET_CURRENT_LOCATION,location.id);
    config.set('currentLocation',location);
  },
  unSaveLocation({commit,getters}, location) {
    commit(UNSAVE_LOCATION,location.id);
    config.set('savedLocations',this.state.locations.filter( location => location.isSaved));
  },
  setLocationAsHome({commit,dispatch}, location) {
    if (!location.isSaved) {
      dispatch('saveLocation',location);
    }
    commit(SET_DEFAULT_LOCATION,location.id);
    config.set('defaultLocation', location.id);
  }
}