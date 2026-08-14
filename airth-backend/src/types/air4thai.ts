export interface Air4ThaiStation {
  stationID: string
  nameTH: string
  nameEN: string
  areaTH: string
  areaEN: string
  stationType: string
  lat: string
  long: string
  AQILast: {
    date: string
    time: string
    PM25?: { color_id: string; aqi: string; value: string }
    PM10?: { color_id: string; aqi: string; value: string }
    O3?: { color_id: string; aqi: string; value: string }
    CO?: { color_id: string; aqi: string; value: string }
    NO2?: { color_id: string; aqi: string; value: string }
    SO2?: { color_id: string; aqi: string; value: string }
    AQI?: { color_id: string; aqi: string; param: string }
  }
}

export interface Air4ThaiResponse {
  stations: Air4ThaiStation[]
}