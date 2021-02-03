import React from "react";
import PropTypes from "prop-types";
import "./PageItem.scss";

const PageItem = (props) => {
  return (
    <div className="page-item">
      <img className="page-item__icon" alt="Category" src={props.icon} />
      <div>
        <div className="page-item__title">{props.name}</div>
        <div className="page-item__section">{props.info}</div>
      </div>
    </div>
  );
};

PageItem.propTypes = {
  info: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default PageItem;
