import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as DevicesIcon } from "../../assets/reservation-devices.svg";
import { ReactComponent as BooksIcon } from "../../assets/reservation-books.svg";
import { ReactComponent as MeetingRoomsIcon } from "../../assets/reservation-meeting-rooms.svg";
import "./ReservationNav.scss";

const ReservationNav = (props) => {
  return (
    <nav className="reservation-nav">
      <Link
        to="/reservations"
        className={classNames("reservation-nav__link", {
          "reservation-nav__link--is-active": props.isActive === "devices",
        })}
      >
        <DevicesIcon />
        <span className="reservation-nav__link-title caption">Devices</span>
      </Link>
      |
      <Link
        to="/reservations/books"
        className={classNames("reservation-nav__link", {
          "reservation-nav__link--is-active": props.isActive === "books",
        })}
      >
        <BooksIcon />
        <span className="reservation-nav__link-title caption">Books</span>
      </Link>
      |
      <Link
        to="/reservations/meeting-rooms"
        className={classNames("reservation-nav__link", {
          "reservation-nav__link--is-active":
            props.isActive === "meeting rooms",
        })}
      >
        <MeetingRoomsIcon />
        <span className="reservation-nav__link-title caption">
          Meeting Rooms
        </span>
      </Link>
    </nav>
  );
};

ReservationNav.propTypes = {
  isActive: PropTypes.string,
};

export default ReservationNav;
