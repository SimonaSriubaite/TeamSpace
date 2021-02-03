import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Geocode from "react-geocode";

const Map = (props) => {
  const [coordinates, setCoordinates] = useState();

  const mapContainerStyle = {
    width: "100%",
    height: "39rem",
  };

  const mapStyles = [
    {
      featureType: "landscape",
      stylers: [
        {
          color: "#08304b",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "labels.text",
      stylers: [
        {
          weight: 3,
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "labels.text.fill",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#3c343a",
        },
        {
          visibility: "simplified",
        },
        {
          weight: 2.5,
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#6e5959",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          weight: 1,
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          color: "#e8e3e3",
        },
        {
          weight: 0.5,
        },
      ],
    },
    {
      featureType: "road",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          color: "#e8e3e3",
        },
        {
          weight: 0.5,
        },
      ],
    },
  ];
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  useEffect(() => {
    Geocode.fromAddress(props.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCoordinates({ lat: lat, lng: lng });
      },
      (error) => {}
    );
  }, [props.address]);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        options={options}
        zoom={18}
        center={coordinates}
      />
    </div>
  );
};

Map.propTypes = {
  address: PropTypes.string,
};

export default Map;
