import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { sortBy } from "lodash";
import { RestaurantSlider, Grid } from "../";
import { checkCoordinates } from "../../utils/checkCoordinates";
import { getDistances } from "../../utils/getDistances";
import "./NearYouSection.scss";

const NearYouSection = (props) => {
  const [status, setStatus] = useState("loading");
  const [userLocation, setUserLocation] = useState(null);
  const [restaurantList, setRestaurantList] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [restaurantListWDistances, setRestaurantListWDistances] = useState(
    null
  );
  const [sortedList, setSortedList] = useState(null);

  // get user location
  useEffect(() => {
    const getUserLocation = () => {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation(position.coords);
          },
          () => {
            setStatus("position-error");
          }
        );
      }
    };
    getUserLocation();
  }, []);

  //get restaurant list
  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      await fetch(
        `${process.env.REACT_APP_DATABASE_URL}/restaurantList?_sort=rating.score&_order=desc`
      )
        .then((res) => res.json())
        .then((res) => {
          setRestaurantList(res);
        })
        .catch(() => {
          setStatus("error");
        });
    };
    fetchRestaurantInfo();
  }, [isChecked]);

  // check if restaurant list doesn't have restaurants with missing coordinates
  useEffect(() => {
    restaurantList && checkCoordinates(restaurantList) && setIsChecked(true);
  }, [restaurantList]);

  // get distances from user to each restaurant and make a new "restaurants with distances" list
  useEffect(() => {
    isChecked &&
      userLocation &&
      setRestaurantListWDistances(getDistances(restaurantList, userLocation));
  }, [isChecked, userLocation, restaurantList]);

  // make a new a sorted list from restaurants with distances
  useEffect(() => {
    restaurantListWDistances &&
      setSortedList(sortBy(restaurantListWDistances, ["distance", "name"]));
  }, [restaurantListWDistances]);

  return (
    <Grid columnCount={1}>
      {status === "position-error" && (
        <p>
          It seems we can&apos;t access your location. In order to see
          &quot;near you&quot; restaurant list, please enable location sharing
          when prompted.
        </p>
      )}
      {status === "error" && (
        <p>
          Ups... something went wrong while trying to fetch data. Try reloading
          the page.
        </p>
      )}
      {sortedList && (
        <RestaurantSlider
          sliderRestaurantData={sortedList}
          currentUser={props.currentUser}
        >
          Discover near you
        </RestaurantSlider>
      )}
    </Grid>
  );
};

NearYouSection.propTypes = {
  currentUser: PropTypes.string,
};

export default NearYouSection;
