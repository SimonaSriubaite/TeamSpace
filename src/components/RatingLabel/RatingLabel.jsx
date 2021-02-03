import React, { useState } from "react";
import PropTypes from "prop-types";
import "./RatingLabel.scss";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ReviewDialog } from "components";

const RatingLabel = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const stars = [];
  const handleClick = (index) => {
    setSelectedRating(index);
    setShowModal(true);
  };
  let starCounter = 5 - props.rating;
  for (let i = 5; i >= 1; i--) {
    let starClassName =
      starCounter >= 0.5
        ? "rating-label__star"
        : "rating-label__star rating-label__star--full-star";
    stars.push(
      <button
        type="button"
        className={starClassName}
        onClick={handleClick.bind(null, i)}
        key={i}
      >
        <Star />
      </button>
    );
    starCounter--;
  }
  return (
    <div className="rating-label">
      <div className="rating-label__star-area">{stars}</div>
      <span className="caption">{props.rating}</span>
      {showModal && (
        <ReviewDialog
          selectedRating={selectedRating}
          restaurantName={props.restaurantName}
          restaurantId={props.restaurantId}
          currentUser={props.currentUser}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

RatingLabel.propTypes = {
  rating: PropTypes.string,
  restaurantName: PropTypes.string,
  restaurantId: PropTypes.string,
  currentUser: PropTypes.string,
};

export default RatingLabel;
