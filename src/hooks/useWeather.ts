import type { CurrentWeather, Unit } from "@/types";
import { createContext, useContext } from "react";

type WeatherContextType = {
  currentWeather: CurrentWeather | undefined;
  setCurrentWeather: (weather: CurrentWeather) => void;
  unit: Unit;
  setUnit: (unit: Unit) => void;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

export { useWeather, WeatherContext };
