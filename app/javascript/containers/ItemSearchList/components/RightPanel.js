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
import {CustomIcon} from '../../../components/MapIcon'

const RightPanel = ({ items }) => {
  const [bound, setBound] = useState([HANOI_LAT_LON]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (items && items.length > 0) {
      setBound(
        items.map((item) => {
          const rent_address = item.apartment.rent_address;
          return [
            rent_address.latitude || 21.0294498,
            rent_address.longitude || 105.8544441,
          ];
        })
      );
    }
  }, [items]);

  useEffect(() => {
    if (map) {
      map.fitBounds(bound);
    }
  }, [bound]);

  return (
    <MapContainer
      bounds={bound}
      zoom={17}
      scrollWheelZoom={true}
      style={{ height: "calc(100vh - 60px)" }}
      whenCreated={(map) => setMap(map)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {!isEmpty(items) &&
        items.map((item) => {
          const rent_address = item.apartment.rent_address;
          const coordinates = [
            rent_address.latitude || 21.0294498,
            rent_address.longitude || 105.8544441,
          ];

          return (
            <Marker position={coordinates} icon={CustomIcon}>
              <Popup>{item.apartment.title}</Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default CSSModules(RightPanel, style);
