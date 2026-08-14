CREATE TABLE IF NOT EXISTS provinces (
  id VARCHAR(50) PRIMARY KEY,
  name_th VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  region VARCHAR(20) NOT NULL,
  lat DECIMAL(9,6) NOT NULL,
  lng DECIMAL(9,6) NOT NULL
);

CREATE TABLE IF NOT EXISTS air_quality (
  id SERIAL PRIMARY KEY,
  province_id VARCHAR(50) NOT NULL REFERENCES provinces(id),
  pm25 DECIMAL(6,2) NOT NULL,
  aqi INT NOT NULL,
  status VARCHAR(20) NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS weather (
  id SERIAL PRIMARY KEY,
  province_id VARCHAR(50) NOT NULL REFERENCES provinces(id),
  temperature DECIMAL(5,2) NOT NULL,
  humidity DECIMAL(5,2) NOT NULL,
  wind_speed DECIMAL(5,2) NOT NULL,
  wind_direction INT NOT NULL,
  rain_probability INT NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS forecast (
  id SERIAL PRIMARY KEY,
  province_id VARCHAR(50) NOT NULL REFERENCES provinces(id),
  forecast_time TIMESTAMPTZ NOT NULL,
  pm25 DECIMAL(6,2) NOT NULL,
  aqi INT NOT NULL,
  temperature DECIMAL(5,2) NOT NULL,
  rain_probability INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS air_quality_history (
  id SERIAL PRIMARY KEY,
  province_id VARCHAR(50) NOT NULL REFERENCES provinces(id),
  pm25 DECIMAL(6,2) NOT NULL,
  aqi INT NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_air_quality_province ON air_quality(province_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_weather_province ON weather(province_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_forecast_province ON forecast(province_id, forecast_time);
CREATE INDEX IF NOT EXISTS idx_history_province ON air_quality_history(province_id, recorded_at DESC);