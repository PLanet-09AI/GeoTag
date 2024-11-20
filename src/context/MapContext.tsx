import { createContext, useContext, useState, ReactNode } from 'react';
import type { MapContextType, Place, UserState, TravelMode } from '../types';

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [userState, setUserState] = useState<UserState>({
    points: 0,
    visitedPlaces: [],
  });
  const [travelMode, setTravelMode] = useState<TravelMode>('DRIVING');
  const [startPoint, setStartPoint] = useState<google.maps.LatLngLiteral | null>(null);
  const [endPoint, setEndPoint] = useState<google.maps.LatLngLiteral | null>(null);

  return (
    <MapContext.Provider
      value={{
        map,
        places,
        userState,
        travelMode,
        startPoint,
        endPoint,
        setMap,
        setPlaces,
        setUserState,
        setTravelMode,
        setStartPoint,
        setEndPoint,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}