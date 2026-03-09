import { WeatherContext } from "@/hooks/useWeather";
import { type CurrentWeather, type Unit } from "@/types/index";
import { useState } from "react";

const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [unit, setUnit] = useState<Unit>("standard");
  const [currentWeather, setCurrentWeather] = useState<
    CurrentWeather | undefined
  >(undefined);

  return (
    <WeatherContext.Provider
      value={{ unit, setUnit, currentWeather, setCurrentWeather }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
