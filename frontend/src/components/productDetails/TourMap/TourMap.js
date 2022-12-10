import React from "react";
import Map from "react-map-gl";
import icons from "../../assests/icons.svg";
import "./TourMap.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import { Marker, Popup } from "react-map-gl";
const TourMap = (props) => {
  const { product: tour } = props;

  return (
    <div id="map">
      <Map
        initialViewState={{
          longitude: tour.locations[0].coordinates[0],
          latitude: tour.locations[0].coordinates[1],
          zoom: 6,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        mapboxAccessToken="pk.eyJ1Ijoia3Jpc2huYXdlYjA3IiwiYSI6ImNrem5lbHZ1MjAzNDIycHFtM2RkcTloaW8ifQ.fQmj8WRhUFMFGydGFpy3xA"
      >
        {tour.locations.map((el) => (
          <Marker
            key={el.description}
            latitude={el.coordinates[1]}
            longitude={el.coordinates[0]}
          >
            <button>
              <svg className="map-pin">
                <use xlinkHref={`${icons}/#icon-map-pin`} />
              </svg>
            </button>
          </Marker>
        ))}
        {tour.locations.map((el) => (
          <Popup
            key={el.description}
            offset={30}
            latitude={el.coordinates[1]}
            longitude={el.coordinates[0]}
          >
            <h4 className="popup">{`${el.description}`}</h4>
          </Popup>
        ))}
      </Map>
    </div>
  );
};

export default TourMap;
