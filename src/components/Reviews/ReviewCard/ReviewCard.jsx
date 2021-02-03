import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Star } from "../../../assets/star.svg";
import classNames from "classnames";
import "./ReviewCard.scss";

const ReviewCard = (props) => {
  return (
    <div
      className={classNames("review-card", {
        "review-card--full": props.fullReviews,
      })}
    >
      <h3 className="review-card__title">{props.username}</h3>
      <p className="review-card__paragraph">{props.comment}</p>
      <div className="review-card__rating">
        <Star className="review-card__rating-icon" />
        <span className="review-card__rating-number">{props.rating}</span>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  username: PropTypes.string,
  comment: PropTypes.string,
  rating: PropTypes.number,
  className: PropTypes.string,
  fullReviews: PropTypes.bool,
};

export default ReviewCard;
