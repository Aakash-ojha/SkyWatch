import { useEffect } from "react";
import { useMap } from "react-leaflet";

function ZoomLocation({ position }: { position: LatLngTuple }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 13, {
      duration: 1.5,
    });
  }, [position, map]);
  return null;
}

export default ZoomLocation;
