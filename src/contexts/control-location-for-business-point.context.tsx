"use client";

import { createContext, useState } from "react";

interface LocationProps {
  lat: number;
  lng: number;
}

interface ControlLocationForBusinessPointContextType {
  handleCaptureUserLocation: ({ lat, lng }: LocationProps) => void;
  handleGetUserLocation: () => Promise<void>;
  businessLocation: LocationProps;
}

interface ControlLocationForBusinessPointContextProps {
  children: React.ReactNode;
}

export const ControlLocationForBusinessPointContext = createContext(
  {} as ControlLocationForBusinessPointContextType,
);

export function ControlLocationForBusinessPointContextProvider({
  children,
}: ControlLocationForBusinessPointContextProps) {
  const [businessLocation, setBusinessLocation] = useState({ lat: 0, lng: 0 });

  const handleCaptureUserLocation = ({ lat, lng }: LocationProps) => {
    setBusinessLocation({ lat, lng });

    return;
  };

  const myLocation: [number, number] = [-35.13145819818388, -6.378905610634973]; // TODO for while

  const handleGetUserLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleCaptureUserLocation({ lat: myLocation[1], lng: myLocation[0] });
      },
      (error) => {
        console.error("Erro ao obter localização:", error.message);
      },
    );
  };

  return (
    <ControlLocationForBusinessPointContext.Provider
      value={{
        handleCaptureUserLocation,
        handleGetUserLocation,
        businessLocation,
      }}
    >
      {children}
    </ControlLocationForBusinessPointContext.Provider>
  );
}
