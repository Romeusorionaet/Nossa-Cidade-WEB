"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useContext } from "react";
import { ControlLocationForBusinessPointContext } from "@/contexts/control-location-for-business-point.context";

export function UserLocationMap() {
  const { handleCaptureUserLocation, businessLocation } = useContext(
    ControlLocationForBusinessPointContext,
  );

  const bounds: [[number, number], [number, number]] = [
    [-6.42, -35.17],
    [-6.35, -35.1],
  ];

  const customIcon = new L.Icon({
    iconUrl: "/imgs/others/marker-location-map.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        handleCaptureUserLocation({ lat, lng });
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[businessLocation.lat, businessLocation.lng]}
      zoom={10}
      className="mx-auto h-[400px] w-full max-w-[1000px] rounded-lg"
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      minZoom={12}
      maxZoom={18}
      preferCanvas
      zoomSnap={0.5}
      tapTolerance={10}
    >
      <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
      <MapClickHandler />
      <Marker
        position={[businessLocation.lat, businessLocation.lng]}
        icon={customIcon}
      />
    </MapContainer>
  );
}
