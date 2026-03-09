import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { type LatLngTuple } from "leaflet";
import { useWeather } from "@/hooks/useWeather";
import ZoomLocation from "./ZoomLocation";
import ClickHandler from "./ClickHandler";

const MapCard = () => {
  const { currentWeather } = useWeather();

  const lat = currentWeather?.lat || 0;
  const lon = currentWeather?.lon || 0;

  const position: LatLngTuple = [lat, lon];
  return (
    <div className="z-0 h-100 w-full rounded-lg bg-gray-800 p-1 md:h-80 lg:h-150">
      <MapContainer
        key={`${lat}-${lon}`}
        center={position}
        zoom={20}
        scrollWheelZoom={false}
        style={{
          padding: "3px",
          height: "100%",
          width: "100%",
          borderRadius: "8px",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {currentWeather
              ? `${currentWeather.city}, ${currentWeather.country}`
              : "Loading..."}
          </Popup>
        </Marker>

        <ZoomLocation position={position} />
        <ClickHandler />
      </MapContainer>
    </div>
  );
};

export default MapCard;
