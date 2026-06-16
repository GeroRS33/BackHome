import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

import "./BackHomeMap.css";

const backHomePosition = [-34.9011, -56.1645];

const backHomeIcon = L.divIcon({
  className: "backhome-map-marker",
  html: "<span></span>",
  iconSize: [34, 34],
  iconAnchor: [17, 17],
  popupAnchor: [0, -18],
});

function BackHomeMap() {
  return (
    <div className="home-map-placeholder home-map-leaflet">
      <MapContainer
        center={backHomePosition}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={backHomePosition} icon={backHomeIcon}>
          <Popup>
            <strong>BackHome</strong>
            <br />
            Montevideo, Uruguay
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default BackHomeMap;