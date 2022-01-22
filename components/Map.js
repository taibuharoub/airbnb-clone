import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  // this will be resonsible for the selected location
  const [selectedLocation, setSelectedLocation] = useState({});
  //   console.log(selectedLocation);

  // Transform the search results object into the
  // {latitude: 52.333, longitude: 4.333}
  // object

  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  // console.log(coordinates);

  // the latitude and longitude of the of locations coordinates
  const center = getCenter(coordinates);
  // console.log(center);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/taibu/ckypr3ztjnnpe15nusc32l8og"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(newViewport) => setViewport(newViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {/* the popup that should show if we click on a Marker  */}
          {/* {result.title} => can cutomize this ie put in div and style it */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
