import React, { useState, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { RestaurantCard } from "../";
import { ReactComponent as Arrow } from "../../assets/sliderArrow.svg";
import "./RestaurantSlider.scss";

const RestaurantSlider = (props) => {
  const [width, setWindowWidth] = useState(0);

  const slideTrackRef = useRef();

  const slideTrackWidth = () => {
    return slideTrackRef.current.clientWidth;
  };

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const windowWidth = () => {
    return window.innerWidth;
  };

  const numOfVisibleSlides = () => {
    switch (true) {
      case windowWidth() <= 767:
        return 1;
      case windowWidth() <= 1023:
        return 2;
      default:
        return 3;
    }
  };

  const reducer = (state, action) => {
    switch (action) {
      case "RESET":
        return sliderController;
      case "PREV":
        return handlePrev(state);
      case "NEXT":
        return handleNext(state);
      default:
    }
  };

  const sliderController = {
    numOfVisibleSides: numOfVisibleSlides(),
    numOfSlides: props.sliderRestaurantData.length,
    translateValue: 0,
  };

  const [sliders, dispatch] = useReducer(reducer, sliderController);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    dispatch("RESET");
  }, [width]);

  function handleNext({ numOfVisibleSides, numOfSlides, translateValue }) {
    if (numOfVisibleSides >= numOfSlides) {
      return { numOfVisibleSides, numOfSlides, translateValue };
    }
    translateValue += -slideTrackWidth();
    return {
      numOfVisibleSides: (numOfVisibleSides += numOfVisibleSlides()),
      numOfSlides,
      translateValue,
    };
  }

  function handlePrev({ numOfVisibleSides, numOfSlides, translateValue }) {
    if (numOfVisibleSides <= numOfVisibleSlides()) {
      return { numOfVisibleSides, numOfSlides, translateValue };
    }
    translateValue += slideTrackWidth();
    return {
      numOfSlides,
      numOfVisibleSides: (numOfVisibleSides -= numOfVisibleSlides()),
      translateValue,
    };
  }

  const styleTransform = {
    transform: `translateX(${sliders.translateValue}px)`,
    transition: "transform ease-out 0.45s",
  };

  return (
    <div className="restaurant-slider">
      <header className="restaurant-slider__header">
        <h2 className="restaurant-slider__title">{props.children}</h2>
        <div className="restaurant-slider__buttons">
          <button
            tabIndex={-1}
            className="restaurant-slider__arrows restaurant-slider__arrows--prev"
            onClick={() => dispatch("PREV")}
          >
            <Arrow className="restaurant-slider__arrows-svg" />
          </button>
          <button
            tabIndex={-1}
            className="restaurant-slider__arrows restaurant-slider__arrows--next"
            onClick={() => dispatch("NEXT")}
          >
            <Arrow className="restaurant-slider__arrows-svg" />
          </button>
        </div>
      </header>
      <div className="restaurant-slider__wrapper">
        <div
          className="restaurant-slider__track"
          ref={slideTrackRef}
          style={styleTransform}
        >
          {props.sliderRestaurantData &&
            props.sliderRestaurantData.map((restaurant, index) => {
              return (
                <div className="restaurant-slider__slide" key={index}>
                  <RestaurantCard
                    type="extended"
                    key={restaurant.id}
                    restaurantId={restaurant.id}
                    name={restaurant.name}
                    imageUrl={restaurant.image}
                    reviewCount={restaurant.rating.userCount}
                    restaurantRating={restaurant.rating.score.toFixed(1)}
                    categories={restaurant.categories}
                    openingHours={restaurant.openingHours[0].hours}
                    website={restaurant.website}
                    address={restaurant.address}
                    description={restaurant.description}
                    currentUser={props.currentUser}
                    likes={restaurant.likes}
                    checkIns={restaurant.checkIns}
                    coordinates={restaurant.coordinates}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

RestaurantSlider.propTypes = {
  currentUser: PropTypes.string,
  sliderRestaurantData: PropTypes.array,
  children: PropTypes.string,
};

export default RestaurantSlider;
