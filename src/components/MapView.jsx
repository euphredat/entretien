import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const MapView = ({ countries, onSelect }) => (
  <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {countries.map(country =>
      country.latlng ? (
        <Marker
          key={country.cca3}
          position={country.latlng}
          icon={customIcon}
          eventHandlers={{ click: () => onSelect(country) }}
        >
          <Popup>{country.name.common}</Popup>
        </Marker>
      ) : null
    )}
  </MapContainer>
);

export default MapView;