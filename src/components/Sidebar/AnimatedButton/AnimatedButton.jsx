import React from "react";
import "./AnimatedButton.scss";
import PropTypes from "prop-types";

const AnimatedButton = (props) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

AnimatedButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default AnimatedButton;
