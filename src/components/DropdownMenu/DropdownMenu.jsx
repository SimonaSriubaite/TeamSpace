import React from "react";
import PropTypes from "prop-types";
import "./DropdownMenu.scss";

const DropdownItem = (props) => {
  return (
    <button className="dropdown-wrapper__item" onClick={props.option?.action}>
      {
        <span className="dropdown-wrapper__item-icon">
          {props.option?.icon}
        </span>
      }
      {props.option?.name}
    </button>
  );
};

const DropdownMenu = (props) => {
  return (
    <div className="dropdown-wrapper">
      <div className="dropdown-wrapper__dropdown">
        {props.options.map((option, index) => {
          return <DropdownItem key={index} option={option} />;
        })}
      </div>
    </div>
  );
};
DropdownItem.propTypes = {
  option: PropTypes.shape({
    icon: PropTypes.element.isRequired,
    name: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  }).isRequired,
};
DropdownMenu.propTypes = {
  options: PropTypes.arrayOf(DropdownItem).isRequired,
};

export default DropdownMenu;
