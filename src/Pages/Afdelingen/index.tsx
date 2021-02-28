import { LatLngExpression } from "leaflet";
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import IAfdeling from "Utils/Types/afdelingen";

const afdelingen = [
  {
    naam: "KAJ Merelbeke",
    tel: "0499 28 32 36",
    coords: [50.99305641222167, 3.751082091746104],
  },
  {
    naam: "KAJ Bottelare",
    "e-mail": "kaj.bottelare@gmail.com",
    coords: [50.97139262791349, 3.7491551103550065],
  },
  {
    naam: "KAJ Watervliet",
    "e-mail": "kaj.watervliet@gmail.com",
    coords: [51.27794342692827, 3.6276925419002386],
  },
  {
    naam: "KAJ Machelen",
    "e-mail": "kaj.machelen@gmail.com",
    coords: [50.96242657287669, 3.4918973466541487],
  },
];

function Afdelingen() {
  const afdelingen: Array<IAfdeling> = require("Assets/Lokalen.json");

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
        <Marker position={item.coords}>
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
