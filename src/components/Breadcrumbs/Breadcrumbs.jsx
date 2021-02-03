import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import "./Breadcrumbs.scss";
import { ReactComponent as Separator } from "../../assets/Vector.svg";

const Breadcrumbs = (props) => {
  const {
    location: { pathname },
  } = props;
  const pathNames = pathname
    .split("/")
    .filter(
      (item) =>
        item &&
        item !== "restaurant" &&
        item !== "category" &&
        item !== "books" &&
        item !== "meeting-rooms"
    )
    .map((item, index) => (index === 1 ? item.split(",")[0] : item))
    .map((item, index) => (index === 1 ? item.split(" - ")[0] : item))
    .map((item, index) => (index > 0 ? item.replace(/-/g, " ") : item));

  const separator = (
    <span className="breadcrumbs__separator"> {<Separator />} </span>
  );

  return pathNames.length ? (
    <nav
      aria-label="breadcrumb"
      className={`breadcrumbs${props.onTop ? " breadcrumbs--on-top" : ""}`}
    >
      <Link className="breadcrumbs__item breadcrumbs__item--link" to={"/"}>
        Dashboard
      </Link>

      {pathNames.map((name, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathNames.length - 1;

        return isLast ? (
          <span key={index} className="breadcrumbs__item">
            {separator} {name}
          </span>
        ) : (
          <Link
            key={index}
            className="breadcrumbs__item breadcrumbs__item--link"
            to={routeTo}
          >
            {separator} {name}
          </Link>
        );
      })}
    </nav>
  ) : null;
};

Breadcrumbs.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  onTop: PropTypes.bool,
};

export default withRouter(Breadcrumbs);
