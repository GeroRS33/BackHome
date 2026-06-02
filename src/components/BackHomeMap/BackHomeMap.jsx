import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "./BackHomeMap.css";

function BackHomeMap() {
  const position = [-34.9011, -56.1645];

  return (
    <section className="backhome-map">
      <MapContainer center={position} zoom={14} scrollWheelZoom={false}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>BackHome - Montevideo</Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}

export default BackHomeMap;