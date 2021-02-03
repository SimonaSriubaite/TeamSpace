import React from "react";
import PropTypes from "prop-types";
import "./NotificationsIcon.scss";
import { ReactComponent as NotificationBell } from "../../assets/notification_bell.svg";

const NotificationsIcon = ({ hasNotifications }) => (
  <button
    className={`notifications-icon ${
      hasNotifications ? "notifications-icon--has-notifications" : ""
    }`}
  >
    <NotificationBell />
  </button>
);

NotificationsIcon.propTypes = {
  hasNotifications: PropTypes.bool,
};

export default NotificationsIcon;
