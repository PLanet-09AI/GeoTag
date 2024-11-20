export interface Place {
  id: string;
  name: string;
  description: string;
  location: google.maps.LatLngLiteral;
  rating?: number;
}

export interface UserState {
  points: number;
  visitedPlaces: string[];
  currentLocation?: google.maps.LatLngLiteral;
}

export type TravelMode = 'DRIVING' | 'WALKING' | 'BICYCLING';

export interface MapContextType {
  map: google.maps.Map | null;
  places: Place[];
  userState: UserState;
  travelMode: TravelMode;
  startPoint: google.maps.LatLngLiteral | null;
  endPoint: google.maps.LatLngLiteral | null;
  setMap: (map: google.maps.Map) => void;
  setPlaces: (places: Place[]) => void;
  setUserState: (state: UserState) => void;
  setTravelMode: (mode: TravelMode) => void;
  setStartPoint: (point: google.maps.LatLngLiteral | null) => void;
  setEndPoint: (point: google.maps.LatLngLiteral | null) => void;
}