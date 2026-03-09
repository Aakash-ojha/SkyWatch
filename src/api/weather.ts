import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const DIRECT_GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0";

export const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: API_KEY,
  },
});

export const directGeoApi = axios.create({
  baseURL: DIRECT_GEO_BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
  },
});

export const reverseGeoApi = axios.create({
  baseURL: DIRECT_GEO_BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
  },
});

export const foreCastApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: API_KEY,
    units: "metric",
  },
});
