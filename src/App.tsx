import { Toaster } from 'react-hot-toast';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import Auth from './components/Auth';
import { MapProvider } from './context/MapContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <Auth />;
  }

  return (
    <MapProvider>
      <div className="relative">
        <Map />
        <Sidebar />
      </div>
    </MapProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}