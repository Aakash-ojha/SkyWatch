import { useWeather } from "@/hooks/useWeather";

import { format, fromUnixTime } from "date-fns";
import {
  MapPin,
  Eye,
  Wind,
  Droplets,
  Gauge,
  Thermometer,
  Sunrise,
  Sunset,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
};

const StatCard = ({ icon: Icon, label, value }: StatCardProps) => (
  <div className="flex flex-row items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 sm:text-left md:items-start md:gap-2 md:p-4">
    <Icon size={18} />
    <div className="flex flex-col items-center text-sky-400 md:ml-5 md:gap-2">
      <span className="text-xs text-slate-400 uppercase">{label}</span>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

export default function WeatherCard() {
  const { currentWeather } = useWeather();

  if (!currentWeather) {
    return (
      <div className="flex h-80 animate-pulse items-center justify-center border-amber-50 bg-slate-900 p-4 text-slate-400 lg:h-full">
        City Not found
      </div>
    );
  }

  const data = {
    unit: currentWeather?.unit,
    city: currentWeather?.city,
    state: currentWeather?.state,
    country: currentWeather?.country,
    temp: currentWeather?.temp,
    condition: currentWeather?.condition,
    high: currentWeather?.high,
    low: currentWeather?.low,
    visibility: currentWeather?.visibility,
    windSpeed: currentWeather?.windSpeed,
    humidity: currentWeather?.humidity,
    pressure: currentWeather?.pressure,
    feelsLike: currentWeather?.feelsLike,
    date: format(fromUnixTime(currentWeather?.dt), "EEEE, MMM d"),
    time: format(fromUnixTime(currentWeather?.dt), "hh:mm a"),
    sunrise: format(fromUnixTime(currentWeather?.sunrise), "hh:mm a"),
    sunset: format(fromUnixTime(currentWeather?.sunset), "hh:mm a"),
  };

  const stats = [
    {
      icon: Eye,
      label: "Visibility",
      value:
        currentWeather.unit === "imperial"
          ? `${(currentWeather.visibility / 1609).toFixed(1)} mi`
          : `${(currentWeather.visibility / 1000).toFixed(1)} km`,
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value:
        currentWeather.unit === "imperial"
          ? `${currentWeather.windSpeed} mph`
          : `${currentWeather.windSpeed} m/s`,
    },
    { icon: Droplets, label: "Humidity", value: `${currentWeather.humidity}%` },
    { icon: Gauge, label: "Pressure", value: `${currentWeather.pressure} hPa` },
    {
      icon: Thermometer,
      label: "Feels Like",
      value:
        currentWeather.unit === "standard"
          ? `${currentWeather.feelsLike} K`
          : currentWeather.unit === "metric"
            ? `${currentWeather.feelsLike}°C`
            : `${currentWeather.feelsLike}°F`,
    },
  ];

  return (
    <div className="flex items-center bg-slate-950 text-white">
      <div className="w-full rounded-3xl border border-white/10 bg-slate-900 p-3 shadow-xl md:p-6">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-2">
              <MapPin size={18} />
            </div>
            <div>
              <h2 className="font-semibold">{data.city}</h2>
              <p className="text-xs text-slate-400">
                {data.state ? `${data.state}, ` : ""}
                {data.country}
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-slate-400">
            <p>{data.date}</p>
            <p>{data.time}</p>
          </div>
        </div>

        {/* Temperature */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-start">
              <span className="text-xl font-bold md:text-5xl">{data.temp}</span>
              <span className="ml-1 text-xl text-slate-400">
                {" "}
                {data.unit === "standard"
                  ? "K"
                  : `${data.unit === "metric" ? "°C" : "°F"}`}
              </span>
            </div>

            <p className="mt-2 text-slate-300">{data.condition}</p>
            <p className="text-xs text-slate-500">
              H: {data.high}° L: {data.low}°
            </p>
          </div>

          <div className="flex flex-col">
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
              alt={currentWeather.description}
              className="h-20 w-20"
            />

            <p className="mt-2 text-slate-300 capitalize">
              {currentWeather.description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 md:gap-4">
          <StatCard icon={Sunrise} label="Sunrise" value={data.sunrise} />
          <StatCard icon={Sunset} label="Sunset" value={data.sunset} />
        </div>
      </div>
    </div>
  );
}
