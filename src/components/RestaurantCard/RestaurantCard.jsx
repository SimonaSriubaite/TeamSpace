import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./RestaurantCard.scss";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as Globe } from "../../assets/globe.svg";
import { ReactComponent as MapPin } from "../../assets/mapPin.svg";
import { RatingLabel, Button, LikeButton, CheckInButton } from "../";
import { getHostname } from "utils/getHostname";

const RestaurantCard = (props) => (
  <article
    className={classNames("restaurant-card", `restaurant-card--${props.type}`)}
  >
    <div className="restaurant-card__image-wrapper">
      <img alt="" className="restaurant-card__image" src={props.imageUrl} />
    </div>
    <Link
      to={`/eat-out/restaurant/${props.name}`}
      className="restaurant-card__link"
    />
    <div className="restaurant-card__review-count">
      <User />
      <span className="caption">{props.reviewCount}</span>
    </div>
    <div className="restaurant-card__rating-label">
      <RatingLabel
        rating={props.restaurantRating}
        restaurantName={props.name}
        restaurantId={props.restaurantId}
        currentUser={props.currentUser}
      />
    </div>
    <div className="restaurant-card__info-area">
      <p className="restaurant-card__categories tiny-uppercase">
        {props.categories.map((value, index) => {
          return (
            <span className="restaurant-card__category-item" key={index}>
              {value}
            </span>
          );
        })}
      </p>
      <div className="restaurant-card__title-area">
        <Link
          to={`/eat-out/restaurant/${props.name}`}
          className="restaurant-card__title-link"
        >
          <h3 className="restaurant-card__title">{props.name}</h3>
        </Link>
        <div className="restaurant-card__like-area">
          <LikeButton
            id={props.restaurantId}
            type="restaurant"
            likes={props.likes}
            currentUser={props.currentUser}
          />
        </div>
      </div>
      <p className="restaurant-card__opening-hours tiny-uppercase">
        {props.openingHours}
      </p>
      {props.type === "extended" && (
        <div className="restaurant-card__extra-info">
          <div className="restaurant-card__website">
            <a
              className="restaurant-card__website-link"
              href={props.website}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Globe />
              <div className="restaurant-card__website-link-text">
                {getHostname(props.website)}
              </div>
            </a>
          </div>
          <div className="restaurant-card__address">
            <a
              className="restaurant-card__address-link"
              href={
                props.coordinates
                  ? `https://www.google.com/maps/@${props.coordinates.lat},${props.coordinates.lng},20z`
                  : "https://www.google.com/maps/"
              }
              target="_blank"
              rel="noreferrer noopener"
            >
              <MapPin />
              <div className="restaurant-card__address-link-text">
                {props.address}
              </div>
            </a>
          </div>
          <p className="restaurant-card__description">{props.description}</p>
          <div className="restaurant-card__buttons">
            <Link
              to={`/eat-out/restaurant/${props.name}`}
              className="restaurant-card__title-link"
            >
              <Button type="text">Read more</Button>
            </Link>
            <CheckInButton
              restaurantId={props.restaurantId}
              currentUser={props.currentUser}
            />
          </div>
        </div>
      )}
    </div>
  </article>
);

RestaurantCard.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  reviewCount: PropTypes.number,
  restaurantRating: PropTypes.string,
  restaurantId: PropTypes.string,
  categories: PropTypes.array,
  openingHours: PropTypes.string,
  website: PropTypes.string,
  address: PropTypes.string,
  description: PropTypes.string,
  likes: PropTypes.array,
  currentUser: PropTypes.string,
  checkIns: PropTypes.array,
  coordinates: PropTypes.object,
};

export default RestaurantCard;
