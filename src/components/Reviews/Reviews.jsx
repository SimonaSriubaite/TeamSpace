import React, { useState, useEffect } from "react";
import { ReviewCard, Button } from "../../components";
import PropTypes from "prop-types";
import "./Reviews.scss";
import classNames from "classnames";

const Reviews = (props) => {
  const [restaurantList, setRestaurantList] = useState(null);
  const [fullReviews, setFullReviews] = useState(false);
  const [buttonText, setButtonText] = useState(false);

  const showReviews = () => setFullReviews(!fullReviews);
  const changeButtonText = () => setButtonText(!buttonText);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_DATABASE_URL}/restaurantReviews?restaurantId=${props.id}`
    )
      .then((res) => res.json())
      .then((res) => {
        setRestaurantList(res);
      })
      .catch((error) => {});
  }, [props.id]);

  return (
    <div className={classNames("reviews")}>
      <h2 className="reviews__title">Reviews</h2>
      <div className="reviews__container">
        {restaurantList &&
          restaurantList.map((restaurant, index) => {
            return (
              <ReviewCard
                key={index}
                id={restaurant.id}
                username={restaurant.userName}
                comment={restaurant.comment}
                rating={restaurant.rating}
                fullReviews={fullReviews}
              />
            );
          })}
      </div>
      {restaurantList && restaurantList.length > 3 && (
        <Button
          type="medium"
          onClick={() => changeButtonText() || showReviews()}
        >
          {buttonText ? "show less" : "show more"}
        </Button>
      )}
    </div>
  );
};

Reviews.propTypes = {
  id: PropTypes.string,
};

export default Reviews;
