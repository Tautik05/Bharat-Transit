import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import busIconImg from "../assets/busicon.png";

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: busIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Fix default marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapView({ busLocation, busStands, busRoute }) {
  return (
    <div className="flex-1 p-3">
      <MapContainer
        center={busLocation}
        zoom={15}
        style={{ height: "50vh", width: "100%" }}
        className="rounded-2xl shadow-lg border-2 border-white"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        <Marker position={busLocation} icon={busIcon}>
          <Popup>Bus currently here 🚌</Popup>
        </Marker>

        {busStands.map((stand, idx) => (
          <Marker key={idx} position={stand.coords}>
            <Popup>{stand.name}</Popup>
          </Marker>
        ))}

        <Polyline positions={busRoute} color="blue" />
      </MapContainer>
    </div>
  );
}
