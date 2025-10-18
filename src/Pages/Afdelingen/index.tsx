import PageDivider from 'Components/PageDivider';
import { LatLngExpression, divIcon } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { colors } from 'Utils/colors';
import IAfdeling from 'Utils/Types/afdelingen';
import { axiosI } from 'Utils/Types/axiosInstance';
import { IPage } from 'Utils/Types/page';
import endpoints from 'Utils/endpoints';
import { AxiosRequestConfig } from 'axios';
import parse from 'html-react-parser';

function Afdelingen() {
  const brusselPos: LatLngExpression = [50.86950695102826, 4.3857279405439815];
  const iconMarkup = renderToStaticMarkup(
    <i
      className='fa fa-map-marker-alt fa-3x'
      style={{ color: colors.globalCta }}
    />
  );
  const customMarkerIcon = divIcon({ html: iconMarkup });

  const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(false);
  const [position, setPosition] = useState<LatLngExpression>(brusselPos);
  const [locations, setLocations] = useState<Array<IAfdeling>>();
  const [content, setContent] = useState<IPage>();

  useEffect(() => {
    const checkForGeolocation = () => {
      if ('geolocation' in navigator) {
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
    map.once('focus', function () {
      map.scrollWheelZoom.enable();
    });
    return null;
  };

  useEffect(() => {
    const fetchAfdelingen = async () => {
      const parser = new DOMParser();
      const axiosconf: AxiosRequestConfig = {
        params: {
          slug: 'afdelingen',
          _embed: true,
        },
      };
      axiosI
        .get<Array<IPage>>(endpoints.pagebyslug, axiosconf)
        .then(({ data }) => {
          let parsedHtml = parser.parseFromString(
            data[0].content.rendered,
            'text/html'
          );

          setContent(data[0]);

          const codeTags: any = parsedHtml.getElementsByTagName('code');
          const h2Tags: any = parsedHtml.getElementsByTagName('h2');
          const addressTags: any = parsedHtml.getElementsByTagName('address');
          const coords: any = [];
          const names: any = [];
          const addresses: any = [];

          for (const h2 of h2Tags) {
            names.push(h2.textContent);
          }

          for (const address of addressTags) {
            addresses.push(address.textContent);
          }

          for (const item of codeTags) {
            coords.push(item.textContent);
          }
          const newLocations = coords.map((item: any, index: any) => {
            const splitCoords = item
              .replace('[', '')
              .replace(']', '')
              .split(',');

            const newCoords: LatLngExpression = [
              Number(splitCoords[0]),
              Number(splitCoords[1]),
            ];
            return {
              naam: names[index],
              coords: newCoords,
              adres: addresses[index],
            };
          });
          setLocations(newLocations);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchAfdelingen();
  }, []);

  return (
    <>
      <PageDivider title={'Afdelingen'} />
      <div className='c-afdelingen'>
        <MapContainer
          className='c-map-container'
          center={position}
          zoom={12}
          scrollWheelZoom={false}>
          <ChangeView center={position} zoom={12} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {locations &&
            locations.map((item, idx) => {
              const key = item.naam || `${item.coords}-${idx}`;
              return (
                <Marker
                  key={key}
                  position={item.coords}
                  icon={customMarkerIcon}>
                  <Popup>
                    {item.naam} <br />
                    {item.adres}
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
        <section className='c-afdeling-section'>
          {content && parse(content.content.rendered)}
        </section>
      </div>
    </>
  );
}

export default Afdelingen;
