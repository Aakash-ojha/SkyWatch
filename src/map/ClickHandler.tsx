import { getCityWeather } from "@/api/weatherService";
import { useWeather } from "@/hooks/useWeather";
import { type LatLng, type LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { Popup, useMapEvents } from "react-leaflet";

function ClickHandler() {
  const [clickedPosition, setClickedPosition] = useState<LatLngTuple | null>(
    null,
  );

  const { setCurrentWeather, unit } = useWeather();

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng as LatLng;
      setClickedPosition([lat, lng]);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setClickedPosition(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [clickedPosition]);

  if (!clickedPosition) return null;

  const handleYesClick = async () => {
    // Handle the "Yes" button click, e.g., fetch weather data for the clicked position

    try {
      const currentWeather = await getCityWeather(
        clickedPosition[0],
        clickedPosition[1],
        unit,
      );
      setCurrentWeather(currentWeather);
    } catch (err) {
      throw new Error("Error fetching weather data: " + err);
    }
    setClickedPosition(null); // Close the popup after handling z
  };

  return (
    <Popup
      position={clickedPosition}
      closeButton={false}
      minWidth={10}
      maxWidth={150}
      maxHeight={90}
      className="p-0!important"
    >
      <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-medium">See weather here?</p>

        <div className="flex flex-row justify-end gap-5">
          <button
            className="cursor-pointer bg-green-300 px-2 py-1 hover:bg-green-500"
            onClick={handleYesClick}
          >
            Yes
          </button>
          <button
            className="cursor-pointer bg-red-400 px-2 py-1 hover:bg-red-500"
            onClick={() => setClickedPosition(null)}
          >
            No
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default ClickHandler;
