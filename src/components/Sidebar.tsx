import { useState } from 'react';
import { useMap } from '../context/MapContext';
import { SpeakerWaveIcon, MapPinIcon } from '@heroicons/react/24/solid';
import type { Place } from '../types';

export default function Sidebar() {
  const { userState, places, travelMode, setTravelMode } = useMap();
  const [speaking, setSpeaking] = useState<string | null>(null);

  const speak = (place: Place) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        `${place.name}. ${place.description}`
      );
      
      utterance.onstart = () => setSpeaking(place.id);
      utterance.onend = () => setSpeaking(null);
      utterance.onerror = () => {
        setSpeaking(null);
        console.error('Speech synthesis error');
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="absolute top-0 right-0 w-80 h-screen bg-white shadow-lg overflow-y-auto">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">GeoVenturer</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Your Journey</h3>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-blue-800">Points: {userState.points}</p>
            <p className="text-blue-800">Places Visited: {userState.visitedPlaces.length}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Travel Mode</h3>
          <div className="flex gap-2">
            {(['DRIVING', 'WALKING', 'BICYCLING'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTravelMode(mode)}
                className={`px-3 py-2 rounded ${
                  travelMode === mode
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {mode.charAt(0) + mode.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Nearby Places</h3>
          {places.length === 0 ? (
            <p className="text-gray-500">No recommendations available yet.</p>
          ) : (
            <div className="space-y-4">
              {places.map((place) => (
                <div
                  key={place.id}
                  className="bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{place.name}</h4>
                    <button
                      onClick={() => speak(place)}
                      className="p-2 hover:bg-gray-200 rounded-full"
                      aria-label={speaking === place.id ? 'Stop speaking' : 'Speak description'}
                    >
                      <SpeakerWaveIcon 
                        className={`w-5 h-5 ${
                          speaking === place.id ? 'text-blue-500' : 'text-gray-500'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{place.description}</p>
                  {place.rating && (
                    <div className="mt-2 flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm">{place.rating}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}