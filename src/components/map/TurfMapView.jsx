import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { Navigation, MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function TurfMapView({
  turfs = [],
  userLocation,
  selectedTurfId,
  onSelectTurf,
  onViewTurfDetails,
  className = "w-full h-full"
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const clusterGroupRef = useRef(null);
  const userMarkerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on state-wide Tamil Nadu (11.1271, 78.6569, zoom 7) or user's selected hub
    const isStateWide = userLocation?.isStateWide || userLocation?.id === 'loc-all';
    const initialLat = isStateWide ? 11.1271 : (userLocation?.lat || 11.0168);
    const initialLng = isStateWide ? 78.6569 : (userLocation?.lng || 76.9558);
    const initialZoom = isStateWide ? 7 : 12;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: initialZoom,
      zoomControl: true,
      attributionControl: false
    });

    // Free Dark Sports Map: ESRI Dark Gray Base (No API key required)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
      attribution: 'Esri, HERE, Garmin, OpenStreetMap'
    }).addTo(map);

    // Road & City Reference Labels
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
      attribution: ''
    }).addTo(map);

    // Initialize Marker Cluster Group for clean, high-performance Tamil Nadu discovery
    const clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 45,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        return L.divIcon({
          html: `<div style="
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: linear-gradient(135deg, #10b981, #059669);
            color: #020617;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-weight: 900;
            border: 2.5px solid #ffffff;
            box-shadow: 0 4px 16px rgba(0,0,0,0.6), 0 0 16px rgba(16,185,129,0.7);
          ">${count}</div>`,
          className: 'custom-turf-cluster',
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });
      }
    });
    map.addLayer(clusterGroup);
    clusterGroupRef.current = clusterGroup;

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      clusterGroupRef.current = null;
    };
  }, []);

  // Update User Location Marker & Radar Beacon
  const accuracyCircleRef = useRef(null);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !userLocation?.lat || !userLocation?.lng) return;

    const latLng = [userLocation.lat, userLocation.lng];

    // Smoothly fly to user's position when location is updated
    map.flyTo(latLng, Math.max(map.getZoom(), 13), {
      animate: true,
      duration: 1.2
    });

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(latLng);
    } else {
      const userRadarIcon = L.divIcon({
        className: 'custom-user-radar-marker',
        html: `
          <div style="position: relative; width: 40px; height: 40px; display: flex; items-center; justify-content: center; pointer-events: auto;">
            <!-- Outer radar pulse wave -->
            <div style="
              position: absolute; 
              inset: -12px; 
              background: rgba(34, 197, 94, 0.25); 
              border: 1.5px solid rgba(34, 197, 94, 0.6);
              border-radius: 50%; 
              animation: ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
            <!-- Secondary inner radar glow -->
            <div style="
              position: absolute; 
              inset: -4px; 
              background: rgba(56, 189, 248, 0.3); 
              border: 1px solid rgba(56, 189, 248, 0.5);
              border-radius: 50%; 
              animation: pulse 1.6s ease-in-out infinite;
            "></div>
            <!-- High-precision core pin -->
            <div style="
              position: relative;
              width: 18px; 
              height: 18px; 
              background: #10b981; 
              border: 3px solid #ffffff; 
              border-radius: 50%; 
              box-shadow: 0 0 16px #10b981, 0 0 30px rgba(56, 189, 248, 0.9);
              margin: auto;
            "></div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -22]
      });

      userMarkerRef.current = L.marker(latLng, { icon: userRadarIcon, zIndexOffset: 1000 })
        .addTo(map)
        .bindPopup(`
          <div style="min-width: 170px; padding: 4px; color: #ffffff;">
            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #34d399; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px;">
              <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #34d399;"></span>
              Live GPS Position
            </div>
            <div style="font-size: 13px; font-weight: 800; color: #ffffff; margin-top: 2px;">
              ${userLocation.area || 'Current Location'}
            </div>
            <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">
              Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}
            </div>
          </div>
        `);
    }

    // Accuracy Circle Coverage
    if (accuracyCircleRef.current) {
      accuracyCircleRef.current.setLatLng(latLng);
    } else {
      accuracyCircleRef.current = L.circle(latLng, {
        radius: 280,
        color: '#10b981',
        weight: 1,
        dashArray: '4, 6',
        fillColor: '#10b981',
        fillOpacity: 0.07
      }).addTo(map);
    }
  }, [userLocation]);

  // Update Turf Markers & Auto-Fit Bounds
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const targetLayer = clusterGroupRef.current || map;

    // Remove obsolete markers
    Object.keys(markersRef.current).forEach((id) => {
      if (!turfs.find((t) => t.id === id)) {
        if (clusterGroupRef.current) {
          clusterGroupRef.current.removeLayer(markersRef.current[id]);
        } else {
          markersRef.current[id].remove();
        }
        delete markersRef.current[id];
      }
    });

    turfs.forEach((turf) => {
      const isSelected = selectedTurfId === turf.id;
      const lat = turf.coordinates?.lat;
      const lng = turf.coordinates?.lng;
      if (!lat || !lng) return;

      const markerHtml = `
        <div style="position: relative; cursor: pointer; transform: ${isSelected ? 'scale(1.18)' : 'scale(1)'}; transition: transform 0.2s;">
          <div style="
            background: ${isSelected ? '#22c55e' : '#0e1524'};
            color: ${isSelected ? '#000000' : '#ffffff'};
            border: 2px solid ${isSelected ? '#ffffff' : '#22c55e'};
            border-radius: 20px;
            padding: 4px 10px;
            font-size: 11px;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 4px;
            white-space: nowrap;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6), 0 0 12px ${isSelected ? 'rgba(34, 197, 94, 0.8)' : 'rgba(34, 197, 94, 0.3)'};
          ">
            <span>⚽</span>
            <span>₹${turf.pricing?.basePrice}</span>
          </div>
          <div style="
            width: 0; 
            height: 0; 
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 6px solid ${isSelected ? '#22c55e' : '#22c55e'};
            margin: -1px auto 0 auto;
          "></div>
        </div>
      `;

      const turfIcon = L.divIcon({
        className: 'turf-map-pin',
        html: markerHtml,
        iconSize: [60, 30],
        iconAnchor: [30, 30],
        popupAnchor: [0, -32]
      });

      if (markersRef.current[turf.id]) {
        markersRef.current[turf.id].setIcon(turfIcon);
      } else {
        const marker = L.marker([lat, lng], { icon: turfIcon });
        targetLayer.addLayer(marker);

        marker.on('click', () => {
          if (onSelectTurf) onSelectTurf(turf);
        });

        // Popup with rich turf card & Live Navigation
        const mapsNavUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation?.lat || ''},${userLocation?.lng || ''}&destination=${lat},${lng}`;
        const popupContent = document.createElement('div');
        popupContent.style.width = '250px';
        popupContent.innerHTML = `
          <div style="border-radius: 12px; overflow: hidden; font-family: inherit;">
            <div style="position: relative; height: 110px; border-radius: 10px; overflow: hidden; margin-bottom: 8px;">
              <img src="${turf.images?.[0] || 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=400&q=80'}" 
                   style="width: 100%; height: 100%; object-fit: cover;" />
              ${turf.distanceKm ? `
                <div style="position: absolute; top: 6px; left: 6px; background: rgba(14, 21, 36, 0.85); backdrop-filter: blur(8px); border: 1px solid rgba(56, 189, 248, 0.4); border-radius: 20px; padding: 2px 8px; font-size: 10px; font-weight: 800; color: #38bdf8;">
                  📍 ${turf.distanceKm} km away
                </div>
              ` : ''}
            </div>
            <h4 style="font-size: 15px; font-weight: 800; color: #ffffff; margin-bottom: 2px; line-height: 1.2;">${turf.name}</h4>
            <div style="font-size: 11px; color: #94a3b8; margin-bottom: 6px;">
              ${turf.area}, ${turf.city || 'Tamil Nadu'}
            </div>
            <div style="display: flex; gap: 4px; margin-bottom: 8px; flex-wrap: wrap;">
              ${turf.sports.map(s => `<span style="font-size: 9px; font-weight: 700; padding: 2px 6px; background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 6px; color: #4ade80;">${s}</span>`).join('')}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1); gap: 6px;">
              <div>
                <div style="font-size: 9px; color: #94a3b8; text-transform: uppercase; font-weight: 700;">From</div>
                <div style="font-size: 14px; font-weight: 900; color: #22c55e;">₹${turf.pricing?.basePrice}<span style="font-size: 10px; color: #94a3b8; font-weight: 500;">/hr</span></div>
              </div>
              <div style="display: flex; items-center; gap: 4px;">
                <a href="${mapsNavUrl}" target="_blank" rel="noopener noreferrer" style="
                  background: #0284c7;
                  color: #ffffff;
                  font-weight: 800;
                  font-size: 10px;
                  text-decoration: none;
                  border-radius: 8px;
                  padding: 6px 9px;
                  display: inline-flex;
                  align-items: center;
                  gap: 3px;
                ">
                  🧭 GO
                </a>
                <button id="popup-btn-${turf.id}" style="
                  background: #22c55e;
                  color: #000000;
                  font-weight: 800;
                  font-size: 11px;
                  border: none;
                  border-radius: 8px;
                  padding: 6px 12px;
                  cursor: pointer;
                ">VIEW</button>
              </div>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`popup-btn-${turf.id}`);
          if (btn) {
            btn.onclick = () => {
              if (onViewTurfDetails) onViewTurfDetails(turf);
            };
          }
        });

        markersRef.current[turf.id] = marker;
      }
    });
  }, [turfs, selectedTurfId, userLocation]);

  // Pan to selected turf when selectedTurfId changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedTurfId) return;

    const turf = turfs.find((t) => t.id === selectedTurfId);
    if (turf?.coordinates) {
      map.flyTo([turf.coordinates.lat, turf.coordinates.lng], 14, { duration: 0.8 });
      const marker = markersRef.current[turf.id];
      if (marker && !marker.isPopupOpen()) {
        marker.openPopup();
      }
    }
  }, [selectedTurfId, turfs]);

  // Auto-fit bounds across Tamil Nadu if state-wide, or pan to selected hub
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || selectedTurfId) return;

    const isStateWide = userLocation?.isStateWide || userLocation?.id === 'loc-all';

    if (isStateWide) {
      const validTurfs = turfs.filter((t) => t.coordinates?.lat && t.coordinates?.lng);
      if (validTurfs.length > 0) {
        const bounds = L.latLngBounds(validTurfs.map((t) => [t.coordinates.lat, t.coordinates.lng]));
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
        }
      } else {
        map.setView([11.1271, 78.6569], 7);
      }
    }
  }, [userLocation, turfs, selectedTurfId]);

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-white/10 ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full min-h-[360px]" />
      
      {/* Current GPS Radar HUD Overlay */}
      <div 
        style={{ backgroundColor: 'rgba(7, 10, 20, 0.88)' }}
        className="absolute top-3 left-3 z-[400] backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-2 text-xs font-semibold text-white/90 shadow-xl"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-black tracking-wider text-emerald-400">Live GPS Radar</span>
          <span className="text-xs font-bold text-white truncate max-w-[200px]">{userLocation?.label || 'Tamil Nadu Marketplace'}</span>
        </div>
      </div>

      {/* Recenter / Fly to Live Location Button */}
      <button
        onClick={() => {
          if (mapInstanceRef.current && userLocation?.lat && userLocation?.lng) {
            mapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 14, {
              animate: true,
              duration: 1.2
            });
            if (userMarkerRef.current) {
              userMarkerRef.current.openPopup();
            }
          }
        }}
        style={{ backgroundColor: 'rgba(7, 10, 20, 0.88)' }}
        className="absolute bottom-4 right-4 z-[400] backdrop-blur-md p-3 rounded-2xl border border-emerald-500/40 text-emerald-400 hover:text-white hover:border-emerald-400 transition-all shadow-2xl active:scale-95 flex items-center gap-1.5"
        title="Fly to My Live GPS Location"
      >
        <Navigation className="w-4 h-4" />
        <span className="text-xs font-bold hidden sm:inline">My GPS</span>
      </button>
    </div>
  );
}
