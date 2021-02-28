import { LatLngExpression } from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function Afdelingen() {
  const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(false);
  const [position, setPosition] = useState<LatLngExpression>([
    50.86950695102826,
    4.3857279405439815,
  ]);

  useEffect(() => {
    const checkForGeolocation = () => {
      if ("geolocation" in navigator) {
        setIsGeolocationEnabled(true);
      }
    };
    checkForGeolocation();
  }, []);

  useEffect(() => {
    if (isGeolocationEnabled) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, [isGeolocationEnabled]);

  return (
    <MapContainer
      className="c-map"
      center={position}
      zoom={13}
      scrollWheelZoom={true}
    >
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Afdelingen;
