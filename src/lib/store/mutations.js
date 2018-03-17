import * as types from './types';

export default {
  [types.SAVE_LOCATiON](state, locationId) {
    const location = state.locations.find( location => location.id ==locationId);
    location.isSaved = true;
  },
  [types.UNSAVE_LOCATION](state, locationId) {
    const location = state.locations.find( location => location.id ==locationId);
    location.isSaved = false;
  },
  [types.SET_DEFAULT_LOCATION](state, locationId) {
    state.defaultLocation = locationId;
  },
  [types.SET_CURRENT_LOCATION](state ,newLocationid) {
    state.selectedLocation = newLocationid;
  },
  [types.PUSH_LOCATION](state, newLocation) {
    state.locations.push({
      id: newLocation.id || newLocation.zmw,
      name: newLocation.name,
      tz: newLocation.tz,
      isSaved: newLocation.isSaved || false
    });
  },
  [types.UPDATE_LOCATION](state, locationId) {
    const location = state.savedLocations.find( loction => loction.id == locationId);
    location.isSaved = true;
  },
  [types.TOGGLE_IS_UPDATING_WEATHER](state) {
    state.isUpdatingWeather = !state.isUpdatingWeather;
  },
  [types.SET_WEATHER](state,payload) {
    if(state.weather.length == 0) {
      state.weather.push({
        locationId:payload.locationId,
        conditions: payload.conditions,
        dailyForecast: payload.dailyForecast,
        hourlyForecast: payload.hourlyForecast
      });
    } else {
      const existing = state.weather.findIndex(w => w.locationId === payload.locationId);
      if (existing >= 0) {
        state.weather[existing] = payload;
      } else {
        state.weather.push(payload);
      }
    }
  },
  [types.SET_ERROR](state,payload) {
    state.error = payload.error;
  }
};