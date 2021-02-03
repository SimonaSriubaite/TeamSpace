import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { RestaurantSlider, Grid } from "../";
import "./NewPlacesSection.scss";

const NewPlacesSection = (props) => {
  const [status, setStatus] = useState("loading");
  const [restaurantList, setRestaurantList] = useState(null);

  //get restaurant list
  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      await fetch(
        `${process.env.REACT_APP_DATABASE_URL}/restaurantList?_sort=rating.userCount&_order=asc`
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
  }, []);

  return (
    <Grid columnCount={1}>
      {status === "error" && (
        <p>
          Ups... something went wrong while trying to fetch data. Try reloading
          the page.
        </p>
      )}
      {restaurantList && (
        <RestaurantSlider
          sliderRestaurantData={restaurantList}
          currentUser={props.currentUser}
        >
          New Places
        </RestaurantSlider>
      )}
    </Grid>
  );
};

NewPlacesSection.propTypes = {
  currentUser: PropTypes.string,
};

export default NewPlacesSection;
