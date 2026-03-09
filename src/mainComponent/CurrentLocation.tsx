import { getCityWeather } from "@/api/weatherService";
import { useWeather } from "@/hooks/useWeather";
import { MapPinIcon } from "lucide-react";
import { useEffect } from "react";

const CurrentLocation = () => {
  const { currentWeather, setCurrentWeather } = useWeather();

  useEffect(() => {
    const getLocationByIP = async () => {
      try {
        const res = await fetch("http://ip-api.com/json/");
        const data = await res.json();

        if (data.status !== "success") throw new Error("IP lookup failed");

        const weather = await getCityWeather(data.lat, data.lon);
        setCurrentWeather(weather);
      } catch (err) {
        const weather = await getCityWeather(40.7128, -74.006);
        setCurrentWeather(weather);
        console.error(
          "Failed to get location by IP, defaulting to New York",
          err,
        );
      }
    };

    getLocationByIP();
  }, [setCurrentWeather]);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (location) => {
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;

        const weather = await getCityWeather(lat, lon);
        setCurrentWeather(weather);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  return (
    <div className="mt-3 ml-8 flex flex-row items-center gap-2">
      <div className="flex flex-col items-center justify-center font-bold">
        <p className="">{currentWeather?.city}</p>
        <p className="text-xs font-bold text-gray-300">
          {currentWeather?.country}
        </p>
      </div>

      <div className="flex animate-pulse flex-row items-center gap-2 rounded-md bg-slate-700/50 px-3 py-1 text-sm text-gray-300">
        <MapPinIcon className="h-5 w-5 cursor-pointer" onClick={getLocation} />
        <p>Use your Precise location</p>
      </div>
    </div>
  );
};

export default CurrentLocation;
