import { LatLngExpression, divIcon } from "leaflet";
import React, { useEffect, useMemo, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { colors } from "Utils/colors";
import IAfdeling from "Utils/Types/afdelingen";

function Afdelingen() {
  const afdelingen: Array<IAfdeling> = require("Assets/Lokalen.json");
  const iconMarkup = renderToStaticMarkup(
    <i
      className="fa fa-map-marker-alt fa-3x"
      style={{ color: colors.globalCta }}
    />
  );
  const customMarkerIcon = divIcon({ html: iconMarkup });
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

  const ChangeView = ({ center, zoom }: any) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  return (
    <MapContainer
      className="c-map-container"
      center={position}
      zoom={12}
      scrollWheelZoom={true}
    >
      <ChangeView center={position} zoom={12} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {afdelingen.map((item) => (
        <Marker position={item.coords} icon={customMarkerIcon}>
          <Popup>
            {item.naam} <br />
            {item["e-mail"]} <br />
            {item.tel}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Afdelingen;
