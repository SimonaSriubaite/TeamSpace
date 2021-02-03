import React from "react";
import { UserProfileWidget } from "components";
import "./Header.scss";

import NotificationsIcon from "components/NotificationsIcon/NotificationsIcon";

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <NotificationsIcon hasNotifications={true} />
        <UserProfileWidget />
      </nav>
    </header>
  );
};

export default Header;
