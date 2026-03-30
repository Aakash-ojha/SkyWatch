import { WeatherContext } from "@/hooks/useWeather";
import { type CurrentWeather, type Unit } from "@/types/index";
import { useState } from "react";

const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [unit, setUnit] = useState<Unit>(() => {
    return (localStorage.getItem("weatherUnit") as Unit) ?? "metric";
  });

  const [currentWeather, setCurrentWeather] = useState<
    CurrentWeather | undefined
  >(undefined);

  const handleSetUnit = (newUnit: Unit) => {
    localStorage.setItem("weatherUnit", newUnit);
    setUnit(newUnit);
  };

  return (
    <WeatherContext.Provider
      value={{
        unit,
        setUnit: handleSetUnit,
        currentWeather,
        setCurrentWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
