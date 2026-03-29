export type theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: theme;
  setTheme: (theme: theme) => void;
}

export type Unit = "metric" | "imperial" | "standard";

export type CurrentWeather = {
  unit: string;
  lat: number;
  lon: number;
  city: string;
  state: string;
  country: string;
  temp: number;
  condition: string;
  description: string;
  icon: string;
  high: number;
  low: number;
  visibility: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
  feelsLike: number;
  dt: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type ForecastListItem = {
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: { main: string; icon: string; description: string }[];
  wind: { speed: number };
  clouds: { all: number };
  pop: number;
  visibility: number;
};

export type DailyForecast = {
  date: string;
  high: number;
  low: number;
  temp: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  clouds: number;
  pop: number;
  visibility: number;
  icon: string;
  condition: string;
  description: string;
};
