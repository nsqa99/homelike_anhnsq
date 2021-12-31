import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import { fullAddress, getLatLngApi } from "../../../../utils";
import { isEqual } from "lodash";
import { HANOI_LAT_LON } from "../../../../common/constant";
import styled from "styled-components";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const FillerWrapper = styled.div`
  .map__filler {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 1000;
    background: rgba(221, 221, 221, 0.8);
  }
`;

const MapComponent = ({ apartment }) => {
  const [latLon, setLatLon] = useState([0, 0]);

  useEffect(async () => {
    const itemAddress = fullAddress(apartment.rent_address);
    const response = await getLatLngApi(itemAddress);
    if (response) {
      setLatLon([parseFloat(response.lat), parseFloat(response.lon)]);
    } else {
      setLatLon(HANOI_LAT_LON);
    }
  }, []);

  return (
    <>
      {!isEqual(latLon, [0, 0]) && (
        <>
          <MapContainer
            center={latLon}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: 400, position: "relative" }}
          >
            {isEqual(latLon, HANOI_LAT_LON) && (
              <FillerWrapper>
                <div className={"map__filler"}>
                  <span className="fs-6 text-center fw-bold fst-italic">
                    Location unavailable due to incorrect address
                  </span>
                </div>
              </FillerWrapper>
            )}

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {!isEqual(latLon, HANOI_LAT_LON) && (
              <Marker position={latLon}>
                <Popup>Hello World</Popup>
              </Marker>
            )}
          </MapContainer>
        </>
      )}
    </>
  );
};

export default MapComponent;
