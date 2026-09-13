import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

// Tamil Nadu-Wide Hubs for Discovery & GPS Testing
export const TAMIL_NADU_LOCATIONS = [
  { id: 'loc-all', label: 'All Tamil Nadu (Marketplace)', area: 'Tamil Nadu', city: 'Tamil Nadu', isStateWide: true, lat: 11.1271, lng: 78.6569 },
  { id: 'loc-chennai', label: 'Chennai Metro Hub', area: 'Chennai', city: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { id: 'loc-coimbatore', label: 'Coimbatore Hub', area: 'Coimbatore', city: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
  { id: 'loc-madurai', label: 'Madurai Cultural Hub', area: 'Madurai', city: 'Madurai', lat: 9.9252, lng: 78.1198 },
  { id: 'loc-trichy', label: 'Tiruchirappalli (Trichy)', area: 'Tiruchirappalli', city: 'Tiruchirappalli', lat: 10.7905, lng: 78.7047 },
  { id: 'loc-salem', label: 'Salem Steel Hub', area: 'Salem', city: 'Salem', lat: 11.6643, lng: 78.1460 },
  { id: 'loc-tiruppur', label: 'Tiruppur Knit City', area: 'Tiruppur', city: 'Tiruppur', lat: 11.1085, lng: 77.3411 },
  { id: 'loc-erode', label: 'Erode Textile Hub', area: 'Erode', city: 'Erode', lat: 11.3410, lng: 77.7172 },
  { id: 'loc-vellore', label: 'Vellore Fort City', area: 'Vellore', city: 'Vellore', lat: 12.9165, lng: 79.1325 },
  { id: 'loc-tirunelveli', label: 'Tirunelveli South', area: 'Tirunelveli', city: 'Tirunelveli', lat: 8.7139, lng: 77.7567 },
  { id: 'loc-thoothukudi', label: 'Thoothukudi Port City', area: 'Thoothukudi', city: 'Thoothukudi', lat: 8.7642, lng: 78.1348 },
  { id: 'loc-dindigul', label: 'Dindigul Hub', area: 'Dindigul', city: 'Dindigul', lat: 10.3673, lng: 77.9803 },
  { id: 'loc-thanjavur', label: 'Thanjavur Delta Hub', area: 'Thanjavur', city: 'Thanjavur', lat: 10.7870, lng: 79.1378 },
  { id: 'loc-hosur', label: 'Hosur Industrial Corridor', area: 'Hosur', city: 'Hosur', lat: 12.7409, lng: 77.8253 },
  { id: 'loc-nagercoil', label: 'Nagercoil (Kanyakumari)', area: 'Nagercoil', city: 'Nagercoil', lat: 8.1833, lng: 77.4119 },
  { id: 'loc-kanchipuram', label: 'Kanchipuram Silk City', area: 'Kanchipuram', city: 'Kanchipuram', lat: 12.8342, lng: 79.7036 },
  { id: 'loc-cuddalore', label: 'Cuddalore Coastal', area: 'Cuddalore', city: 'Cuddalore', lat: 11.7480, lng: 79.7714 },
  { id: 'loc-kumbakonam', label: 'Kumbakonam Temple City', area: 'Kumbakonam', city: 'Kumbakonam', lat: 10.9602, lng: 79.3845 },
  { id: 'loc-karur', label: 'Karur Textile City', area: 'Karur', city: 'Karur', lat: 10.9601, lng: 78.0766 },
  { id: 'loc-namakkal', label: 'Namakkal Transport Hub', area: 'Namakkal', city: 'Namakkal', lat: 11.2189, lng: 78.1678 },
  { id: 'loc-sivakasi', label: 'Sivakasi Spark Hub', area: 'Sivakasi', city: 'Sivakasi', lat: 9.4532, lng: 77.7989 },
];
export const COIMBATORE_LOCATIONS = TAMIL_NADU_LOCATIONS;

export function AppProvider({ children }) {
  // Profiles
  const [profiles, setProfiles] = useState({ players: [], owners: [], admin: null });
  const [currentUser, setCurrentUser] = useState(null);
  const [activeRole, setActiveRole] = useState('PLAYER'); // 'PLAYER' | 'OWNER' | 'ADMIN'

  // Navigation State
  const [currentScreen, setCurrentScreen] = useState('HOME'); // 'HOME' | 'EXPLORE' | 'MAP' | 'TURF_DETAILS' | 'BOOKINGS' | 'OWNER_DASHBOARD' | 'ADMIN_PORTAL'
  const [selectedTurf, setSelectedTurf] = useState(null);

  // GPS / Geolocation State
  const [userLocation, setUserLocation] = useState(TAMIL_NADU_LOCATIONS[0]);
  const [isUsingRealGps, setIsUsingRealGps] = useState(false);
  const [isGpsLoading, setIsGpsLoading] = useState(false);

  // Turfs & Marketplace
  const [turfs, setTurfs] = useState([]);
  const [selectedSport, setSelectedSport] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [userBookings, setUserBookings] = useState([]);

  // Booking Flow State
  const [bookingModalState, setBookingModalState] = useState({
    isOpen: false,
    turf: null,
    date: null,
    selectedSlot: null,
  });

  // Owner Multi-Turf Selection
  const [selectedOwnerTurfId, setSelectedOwnerTurfId] = useState(null);

  // Toast / Live Notification Banner
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info') => {
    const id = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  // Fetch initial profiles
  const fetchProfiles = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/profiles');
      const data = await res.json();
      setProfiles(data);
      if (!currentUser && data.players?.length) {
        setCurrentUser(data.players[0]);
      }
    } catch (err) {
      console.error('Failed to load profiles:', err);
    }
  }, [currentUser]);

  // Fetch approved turfs
  const fetchTurfs = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        date: selectedDate
      });

      if (userLocation) {
        if (!userLocation.isStateWide) {
          params.append('userLat', userLocation.lat);
          params.append('userLng', userLocation.lng);
          if (userLocation.city && userLocation.city !== 'Tamil Nadu') {
            params.append('city', userLocation.city);
          }
        }
      }

      if (selectedSport && selectedSport !== 'All') params.append('sport', selectedSport);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/turfs?${params.toString()}`);
      const data = await res.json();
      setTurfs(data);
    } catch (err) {
      console.error('Failed to load turfs:', err);
    }
  }, [userLocation, selectedDate, selectedSport, searchQuery]);

  // Fetch user bookings
  const fetchUserBookings = useCallback(async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/bookings/my?userId=${currentUser.id}`);
      const data = await res.json();
      setUserBookings(data);
    } catch (err) {
      console.error('Failed to load bookings:', err);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  useEffect(() => {
    fetchTurfs();
  }, [fetchTurfs]);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  // Request browser GPS with reverse geocoding
  const requestRealGps = () => {
    if ('geolocation' in navigator) {
      setIsGpsLoading(true);
      addNotification('Detecting precision GPS location...', 'info');

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          let areaName = 'Live Location';

          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3500);
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`,
              { signal: controller.signal }
            );
            clearTimeout(timeoutId);

            if (res.ok) {
              const data = await res.json();
              areaName =
                data.address?.suburb ||
                data.address?.neighbourhood ||
                data.address?.city_district ||
                data.address?.city ||
                data.address?.town ||
                'Tamil Nadu';
            }
          } catch (e) {
            console.warn('Reverse geocoding timed out, using fallback label');
          }

          const coords = {
            id: 'real-gps',
            label: `${areaName} (GPS)`,
            area: areaName,
            lat,
            lng
          };
          setUserLocation(coords);
          setIsUsingRealGps(true);
          setIsGpsLoading(false);
          addNotification(`📍 Live GPS active: ${areaName}`, 'success');
        },
        (err) => {
          console.warn('Geolocation denied or unavailable:', err);
          setIsGpsLoading(false);
          addNotification('⚠️ GPS access denied. Using Tamil Nadu marketplace.', 'info');
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      addNotification('Geolocation is not supported in this browser', 'error');
    }
  };

  // WebSocket Live Updates Connection
  useEffect(() => {
    let ws;
    const connectWs = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      ws = new WebSocket(wsUrl);

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'SLOT_HELD') {
            addNotification(`⏱️ Slot ${data.hour}:00 is currently on hold for payment checkout.`, 'info');
            fetchTurfs();
          } else if (data.type === 'SLOT_BOOKED') {
            addNotification(`⚽ New booking confirmed for ${data.teamName || 'Team'} at ${data.hour}:00!`, 'success');
            fetchTurfs();
            fetchUserBookings();
          } else if (data.type === 'SLOT_RELEASED') {
            fetchTurfs();
          } else if (data.type === 'TURF_STATUS_CHANGED') {
            addNotification(`📢 Turf "${data.turfName}" status updated to ${data.status}!`, 'info');
            fetchTurfs();
          }
        } catch (e) {
          console.error('WebSocket parse error:', e);
        }
      };

      ws.onclose = () => {
        setTimeout(connectWs, 3000);
      };
    };

    connectWs();
    return () => {
      if (ws) ws.close();
    };
  }, [fetchTurfs, fetchUserBookings, addNotification]);

  // Switch active role / user
  const switchProfile = (profile, role) => {
    setCurrentUser(profile);
    setActiveRole(role);
    if (role === 'OWNER') {
      setCurrentScreen('OWNER_DASHBOARD');
    } else if (role === 'ADMIN') {
      setCurrentScreen('ADMIN_PORTAL');
    } else {
      setCurrentScreen('HOME');
    }
    addNotification(`Switched active profile to ${profile.name} (${role})`, 'success');
  };

  // Open booking bottom-sheet
  const startBooking = (turf, date, slot) => {
    setBookingModalState({
      isOpen: true,
      turf,
      date: date || selectedDate,
      selectedSlot: slot || null
    });
  };

  const closeBooking = () => {
    setBookingModalState({
      isOpen: false,
      turf: null,
      date: null,
      selectedSlot: null
    });
  };

  return (
    <AppContext.Provider
      value={{
        profiles,
        currentUser,
        activeRole,
        switchProfile,
        currentScreen,
        setCurrentScreen,
        selectedTurf,
        setSelectedTurf,
        userLocation,
        setUserLocation,
        isUsingRealGps,
        isGpsLoading,
        requestRealGps,
        turfs,
        setTurfs,
        fetchTurfs,
        selectedSport,
        setSelectedSport,
        searchQuery,
        setSearchQuery,
        selectedDate,
        setSelectedDate,
        userBookings,
        fetchUserBookings,
        bookingModalState,
        startBooking,
        closeBooking,
        selectedOwnerTurfId,
        setSelectedOwnerTurfId,
        notifications,
        addNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
