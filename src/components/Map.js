// src/components/Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correction des icônes par défaut de Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = ({ destinations }) => {
    const position = [20, 0]; // Position initiale (centre de la carte)

    return (
        <MapContainer center={position} zoom={2} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {destinations.map(destination => (
                <Marker key={destination.id} position={[destination.location.lat, destination.location.lng]}>
                    <Popup>
                        <strong>{destination.name}</strong><br />
                        {destination.description}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
