import type { Unit } from "@/types";
import { directGeoApi, foreCastApi, weatherApi } from "./weather";

export const getCityWeather = async (
  lat: number,
  lon: number,
  units: Unit = "standard",
) => {
  try {
    const [weatherResponse, reverseResponse] = await Promise.all([
      weatherApi.get("/weather", { params: { lat, lon, units } }),
      directGeoApi.get("/reverse", { params: { lat, lon, limit: 1 } }),
    ]);

    const data = weatherResponse.data;
    const place = reverseResponse.data[0];

    const countryName = new Intl.DisplayNames(["en"], { type: "region" }).of(
      place?.country ?? data.sys.country,
    );

    return {
      lat,
      lon,
      unit: units,
      city: data.name,
      state: place?.state ?? "",
      country: countryName ?? place?.country ?? data.sys.country,
      temp: data.main.temp,
      condition: data.weather[0].main,
      high: data.main.temp_max,
      icon: data.weather[0].icon,
      low: data.main.temp_min,
      visibility: data.visibility,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      feelsLike: data.main.feels_like,
      dt: data.dt,
      timezone: data.timezone,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      description: data.weather[0].description,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

export const getForecastWeather = async (
  lat: number,
  lon: number,
  units: string = "standard",
) => {
  try {
    const response = await foreCastApi.get("/forecast", {
      params: { lat, lon, units },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
};

export const getCityCoordinates = async (city: string) => {
  try {
    const response = await directGeoApi.get("/direct", {
      params: { q: city, limit: 5 },
    });
    console.log("getCityCoordinates", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
    throw error;
  }
};
