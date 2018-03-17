# Weather App Notes

## What do I want to see first?
- Location
- Current conditions
  - Temperature
  - Windchill/Heat index
  - Precipitation
  - Wind speed & direction
- Todays forecast summary (high/low temps, rain?)

## What do I want to see next?
- Details
- Forecast

## Todo
### UI
- [x] !! Toggle daily forecast lengths
- [ ] !!! Make responsive
- [ ] ! Clean up styles
- [ ] ! Isolate forecast components' shared behavior
- [ ] !! Fix summary/conditions view layout

### Data
- [ ] !! Checked cached weather before hitting api

## App State
```
apiKey: <string>
selectedLocationId: <number>
locations:
  - id: <number>
    name: <string>
    tz: <string>
    isSaved: <boolean>
weather:
  - locationId: <number>
    conditions:
      ...
    dailyForecast:
      ...
    hourlyForecast:
      ...
```

## Components
### App
The root of the application.

### Locations
Displays a list of all saved locations and provides a location search box.

### Conditions
Displays the current connditions at the selected location.

### Forecast
Displays the forecast for the selected location.

### Wind-o-meter
Displays the current wind speed, direction, and gust.

The component will consist of a ring of 16 identical segments to indicate the general direction the wind is coming from. The 4 cardinal directions will be labeled (N,S,E,W). The segment corresponding to the given wind direction will be highlighted. The wind speed and gust will be displayed in the middle of the ring, with the speed above the gust in larger font.

The component will expose three properties: `speed`, `gust`, and `direction`.