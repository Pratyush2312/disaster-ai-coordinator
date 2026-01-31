import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import AlertPanel from "../Sidebar/AlertPanel";
import Legend from "./Legend";
const URL = import.meta.env.VITE_API_URL
const colorMap = {
  RED: "red",
  ORANGE: "orange",
  YELLOW: "yellow",
};

function FlyTo({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], 8, { duration: 1.5 });
  }, [lat, lon, map]);
  return null;
}

export default function DisasterMap() {
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/analyze`);
      const data = await res.json();

      // 🛡️ Safety check
      if (Array.isArray(data)) {
        setZones(data);
      } else {
        console.warn("API did not return array:", data);
        setZones([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setZones([]);
    }
  };


  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Legend */}
      <Legend />

      {/* Mobile Alerts Toggle */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="absolute top-4 left-4 z-[9999] bg-black text-white px-3 py-1 rounded md:hidden"
      >
        ☰ Alerts
      </button>

      <div className="flex h-full flex-col md:flex-row">
        {/* Sidebar */}
        {(showSidebar || window.innerWidth >= 768) && (
          <AlertPanel zones={zones} onSelect={setSelectedZone} />
        )}

        {/* Map */}
        <div className="flex-1 h-[70vh] md:h-full">
          <MapContainer
            center={[23.5, 85]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {selectedZone && (
              <FlyTo lat={selectedZone.lat} lon={selectedZone.lon} />
            )}

            {zones.map((z, i) => (
              <CircleMarker
                key={i}
                center={[z.lat, z.lon]}
                radius={18}
                pathOptions={{ color: colorMap[z.risk.zone_color] }}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-bold">{z.zone}</p>
                    <p>Risk: {z.risk.risk_level}</p>
                    <p>Action: {z.recommended_action}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
