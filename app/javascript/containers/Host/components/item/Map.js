import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fullAddress, getLatLngApi } from "../../../../utils";
import { isEqual } from "lodash";
import { HANOI_LAT_LON } from "../../../../common/constant";
import styled from "styled-components";
import { CustomIcon } from "../../../../components/MapIcon";

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

const MapComponent = ({ latLon, setLatLon }) => {
  // const [coordinates, setCoordinates] = useState(HANOI_LAT_LON);
  // const [selectedPosition, setSelectedPosition] = useState(latLon);

  // useEffect(async () => {
  //   if (latLon) {
  //     setCoordinates(latLon);
  //   }
  // }, [latLon]);
  const [map, setMap] = useState(null);
  useEffect(() => {
    if (map && latLon) {
      map.fitBounds([latLon]);
    }
  }, [latLon]);

  const Markers = () => {
    const map = useMapEvents({
      click(e) {
        setLatLon([e.latlng.lat, e.latlng.lng]);
      },
    });

    return <></>
  };

  return (
    <>
      <MapContainer
        bounds={[latLon]}
        zoom={15}
        scrollWheelZoom={true}
        style={{
          height: 300,
          marginTop: 20,
          borderRadius: 4,
          position: "relative",
        }}
        whenCreated={(map) => setMap(map)}
      >
        {isEqual(latLon, HANOI_LAT_LON) && (
          <FillerWrapper>
            <div className="map__filler">
              <span className="fs-5 text-center text-danger fw-bold">
                Verify your address before continue
              </span>
            </div>
          </FillerWrapper>
        )}

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {!isEqual(latLon, HANOI_LAT_LON) && (
          <Marker
            position={latLon}
            icon={CustomIcon}
            onClick={(e) => handleClick(e)}
          >
            <Popup>{"Hello"}</Popup>
          </Marker>
        )}
        <Markers />
      </MapContainer>
    </>
  );
};

export default MapComponent;
