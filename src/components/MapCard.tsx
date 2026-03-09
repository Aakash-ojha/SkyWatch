import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { type LatLngTuple } from "leaflet";
import { type LatLng } from "leaflet";
import { useWeather } from "@/hooks/useWeather";
import { useEffect, useState } from "react";

function ZoomLocation({ position }: { position: LatLngTuple }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 13, {
      duration: 1.5,
    });
  }, [position, map]);
  return null;
}

function ClickHandler() {
  const [clickedPosition, setClickedPosition] = useState<LatLng | null>(null);
  console.log(clickedPosition);
  useMapEvents({
    click: (e) => {
      setClickedPosition(e.latlng);
    },
  });

  if (!clickedPosition) return null;
  return null;
}

const MapCard = () => {
  const { currentWeather } = useWeather();

  const lat = currentWeather?.lat || 0;
  const lon = currentWeather?.lon || 0;

  const position: LatLngTuple = [lat, lon];
  return (
    <div className="h-100 w-full rounded-lg bg-gray-800 p-1 md:h-80 lg:h-150">
      <MapContainer
        center={position}
        zoom={13}
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
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <ZoomLocation position={position} />
        <ClickHandler />
      </MapContainer>
    </div>
  );
};

export default MapCard;
