export type theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: theme;
  setTheme: (theme: theme) => void;
}

export type Unit = "metric" | "imperial" | "standard";

export type CurrentWeather = {
  lat: number;
  lon: number;
  city: string;
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
