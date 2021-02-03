import React from "react";
import { ReactComponent as HeartIcon } from "../../assets/heart.svg";
import { ReactComponent as CheckIcon } from "../../assets/check.svg";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as CircleIcon } from "../../assets/circle_x.svg";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import PropTypes from "prop-types";
import "./ReservationSearch.scss";

const ReservationSearch = (props) => {
  return (
    <div className="search">
      <h2 className="search__title">Search</h2>
      <div className="search__categories">
        <button className="search__category search__category--dark">All</button>
        <button className="search__category search__category--favorites">
          <HeartIcon className="search__category-icon search__category-icon--heart" />{" "}
          Favorites
        </button>
        <button className="search__category">
          <CheckIcon className="search__category-icon" /> Available
        </button>
      </div>
      <div className="search__input-container">
        <div className="search__inputs search__inputs--long">
          <label
            className="search__label search__label--hidden"
            htmlFor="book-title"
          >
            Book title
          </label>
          <input
            className="search__input search__input--long"
            id="book-title"
            type="text"
            placeholder={props.placeholder}
          />
          <CircleIcon className="search__input-icon search__input-icon--circle" />
        </div>
        <div className="search__inputs search__inputs--short">
          <label
            className="search__label search__label--visible"
            htmlFor="date"
          >
            Reservation date
          </label>
          <input
            className="search__input search__input--short"
            id="date"
            type="text"
            placeholder="21 July 2021"
          />
          <CalendarIcon className="search__input-icon search__input-icon--calendar" />
        </div>
        <button className="search__inputs-button">
          <SearchIcon className="search__inputs-icon" />
          Search
        </button>
      </div>
    </div>
  );
};

ReservationSearch.propTypes = {
  placeholder: PropTypes.string,
};

export default ReservationSearch;
