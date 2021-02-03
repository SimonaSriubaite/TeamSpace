import React from "react";
import "./SidebarNavItem.scss";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

const SidebarNavItem = (props) => {
  const exactLink = () => (props.slug === "/" ? true : false);
  return (
    <>
      <NavLink
        className={classNames("navigation-link", props.className)}
        exact={exactLink()}
        to={props.slug}
        onClick={props.onClick}
      >
        <div className="navigation-item">
          {props.children}
          <span
            className={classNames(
              "navigation-item__title",
              props.titleClassName
            )}
          >
            {props.title}
          </span>
        </div>
      </NavLink>
    </>
  );
};

SidebarNavItem.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  slug: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default SidebarNavItem;
