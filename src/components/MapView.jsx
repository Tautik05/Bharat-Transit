import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Bus icon
const busIcon = new L.DivIcon({
  html: `<div style="color:#FFD700;font-size:24px;">🚌</div>`,
  iconSize: [24, 24],
  className: "custom-bus-icon",
});

// User location icon (blue dot)
const userIcon = new L.DivIcon({
  html: `<div style="width:14px; height:14px; background-color:#4285F4; border-radius:50%; border:2px solid white;"></div>`,
  iconSize: [14, 14],
  className: "custom-user-icon",
});

// Hardcoded arbitrary buses
const arbitraryBuses = [
  { name: "41B", position: [22.575, 88.365] },
  { name: "S9", position: [22.568, 88.37] },
  { name: "SD5", position: [22.565, 88.358] },
];

// Map updater to handle center changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  if (center) {
    map.setView(center, map.getZoom(), { animate: true });
  }
  return null;
};

// Auto fit bounds when route mode
const FitRouteBounds = ({ positions }) => {
  const map = useMap();
  if (positions && positions.length > 0) {
    map.fitBounds(positions, { padding: [50, 50] }); // add some padding
  }
  return null;
};

const MapView = ({ selectedBus, center }) => {
  const userPosition = [22.5726, 88.3639]; // default user location
  const defaultCenter = center || userPosition;

  // Route info for selected bus (hardcoded)
  const route = selectedBus
    ? {
        start: [22.551, 88.35], // starting point
        end: [22.58, 88.37],    // ending point
        busPos: [22.565, 88.36], // bus current location
      }
    : null;

  // Bounds for route mode
  const routePositions = route ? [route.start, route.busPos, route.end] : [];

  return (
    <div className="w-full h-full relative rounded-lg shadow-inner overflow-hidden z-0">
      <MapContainer center={defaultCenter} zoom={14} className="w-full h-full" zoomControl={false} scrollWheelZoom={false} >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Map updater to recenter smoothly */}
        <MapUpdater center={defaultCenter} />

        {/* Auto zoom to fit route */}
        {routePositions.length > 0 && <FitRouteBounds positions={routePositions} />}

        {/* User location marker */}
        <Marker position={userPosition} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
        {/* Soft blue radius */}
        <Circle
          center={userPosition}
          radius={120}
          pathOptions={{ color: "#4285F4", fillColor: "#4285F4", fillOpacity: 0.2, weight: 0 }}
        />

        {/* Default mode: arbitrary buses */}
        {!selectedBus &&
          arbitraryBuses.map((bus, idx) => (
            <Marker key={idx} position={bus.position} icon={busIcon}>
              <Popup>{bus.name}</Popup>
            </Marker>
          ))}

        {/* Route mode */}
        {selectedBus && route && (
          <>
            {/* Bus marker */}
            <Marker position={route.busPos} icon={busIcon}>
              <Popup>{selectedBus.name}</Popup>
            </Marker>

            {/* Start and End markers */}
            <Marker position={route.start}>
              <Popup>Start: {selectedBus.name} Route</Popup>
            </Marker>
            <Marker position={route.end}>
              <Popup>End: {selectedBus.name} Route</Popup>
            </Marker>

            {/* Route line */}
            <Polyline
              positions={[route.start, route.busPos, route.end]}
              pathOptions={{ color: "blue", dashArray: "6 6" }}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
