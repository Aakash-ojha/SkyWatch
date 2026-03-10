import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { type LatLngTuple } from "leaflet";
import { useWeather } from "@/hooks/useWeather";
import ZoomLocation from "./ZoomLocation";
import ClickHandler from "./ClickHandler";
import { renderToString } from "react-dom/server";
import { MapPin } from "lucide-react";

const customIcon = L.divIcon({
  html: renderToString(<MapPin size={32} color="#aacbda" fill="#8e38f895" />),
  className: "",

  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapCard = () => {
  const { currentWeather } = useWeather();
  const lat = currentWeather?.lat || 0;
  const lon = currentWeather?.lon || 0;

  const position: LatLngTuple = [lat, lon];
  return (
    <div className="z-0 h-100 w-full rounded-lg bg-gray-800 p-1 md:h-80 lg:h-150">
      <MapContainer
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
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position} icon={customIcon}>
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
