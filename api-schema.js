const schema = {
  location: {
    name: String, // Display name
    id: String, // Unique ID of location
    timezone: String //IANA timezone of location
  },
  current: {
    date: DateTime, // UTC Date that the observation was made
    temperature: Number,
    feelsLike: Number,
    windSpeed: Number,
    windDirection: Number, // in degrees,
    windGust: Number,
    pressure: Number,
    pressureTrend: String, // +, -, or empty
    humidity: Number,
    dewPoint: Number,
    uvIndex: Number,
    visibility: String,
    precipLastHour: Number,
    precipToday: Number,
    condition: String, // Short displayable description of conditions
    icon: String // key used to find display icon
  },
  hourly: {
    date: DateTime,
    hours: [{
      period: String,
      temperature: Number,
      chanceOfPrecip: Number,
      windDirection: Number,
      windSpeed: Number,
      description: String,
      condition: String,
      icon: String
    }]
  },
  daily: {
    date: DateTime,
    days: [{
      period: String,
      high: Number,
      low: Number,
      chanceOfPrecip: Number,
      windDirection: Number,
      windSpeed: Number,
      description: String,
      condition: String,
      icon: String
    }]
  }
}