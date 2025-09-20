import { useRef, useEffect, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = "pk.eyJ1IjoiZGhydXZpc2hhaCIsImEiOiJjbTdhbDNza2MwNW9rMnJzOWo3bXB5NHByIn0.ZWMHw6TzsGB0o48eFmf8WQ";

export default function MapWithGeocoder() {
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.5, 40], // default position
      zoom: 9, // zoom level
    });

    mapInstanceRef.current.on("load", () => {
      setMapLoaded(true);
    });
  }, []);

  const handleSelected = (selectedItem) => {
    const address = selectedItem.place_name; // This may need to be adjusted depending on the response structure

    // Update the state with the selected address
    setInputValue(address);
  };

  return (
    <>
      <SearchBox
        accessToken={accessToken}
        map={mapInstanceRef.current}
        mapboxgl={mapboxgl}
        value={inputValue} // Sync input field with state
        onChange={(e) => setInputValue(e)} // Update state on input change
        onSelected={handleSelected} // Handle selection of an address
        marker
      />
      <div id="map-container" ref={mapContainerRef} style={{ height: 300 }} />
    </>
  );
}