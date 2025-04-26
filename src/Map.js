import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const position = [16.047079, 108.206230]; // Vị trí Đà Nẵng

  return (
    <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' })}>
        <Popup>
          Đây là khu vực dọn rác.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

