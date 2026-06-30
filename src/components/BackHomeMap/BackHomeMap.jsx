import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import L from "leaflet";

import isotipoBH from "../../assets/images/isotipo.png";
import "./BackHomeMap.css";

const backHomePosition = [
  -34.9011,
  -56.1645,
];

const backHomeIcon = L.divIcon({
  className:
    "backhome-custom-marker-wrapper",

  html: `
    <div class="backhome-custom-marker">
      <div class="backhome-custom-marker-pin">
        <img src="${isotipoBH}" alt="" />
      </div>
    </div>
  `,

  iconSize: [52, 68],
  iconAnchor: [26, 68],
  popupAnchor: [0, -68],
});

function BackHomeMap() {
  return (
    <div className="home-map-placeholder home-map-leaflet">
      <MapContainer
        center={backHomePosition}
        zoom={14}
        minZoom={12}
        maxZoom={18}
        scrollWheelZoom={false}
        zoomControl
        attributionControl
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          updateWhenIdle
          keepBuffer={2}
          detectRetina={false}
        />

        <Marker
          position={backHomePosition}
          icon={backHomeIcon}
        >
          <Popup>
            <strong>BackHome</strong>
            <br />
            Bulevar General Artigas 1465
            <br />
            Montevideo, Uruguay
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default BackHomeMap;