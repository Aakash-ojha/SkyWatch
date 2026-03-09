import type { LatLngTuple } from "leaflet";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

function ZoomLocation({ position }: { position: LatLngTuple }) {
  const map = useMap();
  const prevPosition = useRef<LatLngTuple | null>(null);

  useEffect(() => {
    // 👇 ignore default [0, 0] position
    if (position[0] === 0 && position[1] === 0) return;

    // 👇 ignore if same position
    if (
      prevPosition.current?.[0] === position[0] &&
      prevPosition.current?.[1] === position[1]
    )
      return;

    prevPosition.current = position;
    map.flyTo(position, 13, { duration: 1.5 });
  }, [position, map]);

  return null;
}

export default ZoomLocation;
