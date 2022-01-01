import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import { fullAddress, getLatLngApi } from "../../../utils";
import { isEmpty, isEqual } from "lodash";
import styled from "styled-components";
import { HANOI_LAT_LON } from "../../../common/constant";
import CSSModules from "react-css-modules";
import style from "../styles/right-panel.module.scss";
import { useRef } from "react";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const PostWrapper = styled.div`
  margin-top: 30px;
`;

const RightPanel = ({ items }) => {
  const [bound, setBound] = useState([[0, 0]]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (items) {
      setBound(
        items.map((item) => {
          const rent_address = item.apartment.rent_address;
          return [rent_address.latitude, rent_address.longitude];
        })
      );
    }
  }, [items]);

  useEffect(() => {
    if (!isEqual(bound, [[0, 0]]) && map) {
      map.fitBounds(bound);
    }
  }, [bound])

  return (
    <>
      {!isEqual(bound, [[0, 0]]) && (
        <>
          <MapContainer
            bounds={bound}
            zoom={17}
            scrollWheelZoom={true}
            style={{ height: "calc(100vh - 60px)" }}
            whenCreated={map => setMap(map)}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {!isEmpty(items) &&
              items.map((item) => {
                const rent_address = item.apartment.rent_address;
                const coordinates = [
                  rent_address.latitude,
                  rent_address.longitude,
                ];

                return (
                  <Marker position={coordinates}>
                    <Popup>{item.apartment.title}</Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        </>
      )}
    </>
  );
};

export default CSSModules(RightPanel, style);
