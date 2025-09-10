import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { FaBus } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

const busIcon = new L.DivIcon({
  html: `<div style="color:#FFD700;font-size:24px;"><i class="fas fa-bus"></i></div>`,
  iconSize: [24, 24],
  className: "custom-bus-icon",
});

const MapView = ({ selectedBus, center, theme }) => {
  const position = center || [22.5726, 88.3639]; // Default center: Kolkata

  const busPosition = selectedBus ? [22.58, 88.37] : null;
  const userPosition = [22.57, 88.36];

return (
  <div
    id="map-wrapper"
    className={`w-full h-full rounded-lg shadow-inner overflow-hidden`}
    style={{
      transform: "translateY(var(--map-translate, 0px))",
      transition: "transform 160ms linear",
      willChange: "transform",
    }}
  >
    <MapContainer center={position} zoom={13} className="w-full h-full" zoomControl={false}>
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location */}
        <Marker position={userPosition} >
          <Popup>You are here</Popup>
        </Marker>

        {/* Bus marker */}
        {busPosition && (
          <Marker position={busPosition} icon={busIcon} >
            <Popup>{selectedBus.name}</Popup>
          </Marker>
        )}

        {/* Route line */}
        {busPosition && (
          <Polyline
            positions={[userPosition, busPosition]}
            pathOptions={{ color: "blue", dashArray: "6 6" }}
          />
        )}
    </MapContainer>
  </div>
);
};

export default MapView;
