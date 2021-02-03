import React, { useState } from "react";
import { SidebarNavItem, AnimatedButton } from "../../components";
import { ReactComponent as HomeIcon } from "assets/home.svg";
import { ReactComponent as BookmarkIcon } from "assets/bookmark.svg";
import { ReactComponent as CompassIcon } from "assets/compass.svg";
import { ReactComponent as PointerIcon } from "assets/pointer.svg";
import { ReactComponent as Logo } from "../../assets/logoexp.svg";
import classNames from "classnames";
import "./Sidebar.scss";

const Sidebar = () => {
  const [sidebarExpanded, setSidebar] = useState(false);
  const [mobileIsActive, setActive] = useState(false);

  const showSidebarExp = () => setSidebar(!sidebarExpanded);
  const handleLinkClick = () => (sidebarExpanded ? showSidebarExp : null);

  const handleMobileClick = () => (mobileIsActive ? toggleClass : null);

  const toggleClass = () => {
    setActive(!mobileIsActive);
  };

  return (
    <div
      className={classNames(
        "sidebar",
        {
          "sidebar--exp": sidebarExpanded,
        },
        { "sidebar--mobile": mobileIsActive }
      )}
    >
      <div className="sidebar__wrapper-sticky">
        <figure className="sidebar__logo">
          <Logo className="sidebar__logo-img" alt="Team Space logo" />
          <AnimatedButton
            className={classNames("button-animated", {
              "button-animated--on": mobileIsActive,
            })}
            onClick={toggleClass}
          />
        </figure>

        <button className="sidebar__pointer">
          <PointerIcon
            className="sidebar__pointer-icon"
            onClick={showSidebarExp}
          />
        </button>

        <div className="sidebar__navigation">
          <SidebarNavItem
            slug="/"
            title="Dashboard"
            onClick={handleLinkClick() || handleMobileClick()}
          >
            <HomeIcon className="navigation-item__icon" />
          </SidebarNavItem>

          <SidebarNavItem
            className="navigation-link--relative"
            slug="/reservations"
            titleClassName="navigation-item__title--reservations"
            title="Reservations"
            onClick={handleLinkClick() || handleMobileClick()}
          >
            <BookmarkIcon className="navigation-item__icon navigation-item__icon--sm" />
          </SidebarNavItem>

          <SidebarNavItem
            className="navigation-link--relative navigation-link--third"
            slug="/eat-out"
            title="Eat-Out"
            onClick={handleLinkClick() || handleMobileClick()}
          >
            <CompassIcon className="navigation-item__icon" />
          </SidebarNavItem>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
