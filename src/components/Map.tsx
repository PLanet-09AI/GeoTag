import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useMap } from '../context/MapContext';

const DURBAN_CENTER = { lat: -29.8587, lng: 31.0218 };

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { setMap, setUserState, userState } = useMap();

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: DURBAN_CENTER,
          zoom: 13,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeControl: false,
          fullscreenControl: false
        });

        setMap(map);

        // Get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              new google.maps.Marker({
                position: pos,
                map: map,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: '#4285F4',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                },
                title: 'Your Location'
              });

              setUserState({
                ...userState,
                currentLocation: pos
              });
            },
            () => {
              console.error('Error: The Geolocation service failed.');
            }
          );
        }
      }
    }).catch(e => {
      console.error('Error loading Google Maps:', e);
    });
  }, []);

  return (
    <div ref={mapRef} className="w-full h-screen" />
  );
}