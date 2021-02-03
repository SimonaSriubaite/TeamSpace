import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { convertStringToUrl } from "../../../utils/convertStringToUrl";
import "./CategoryItem.scss";

const CategoryItem = (props) => {
  const findUrl = () =>
    props.option.title === "Devices"
      ? "/reservations"
      : `${props.option?.url}/${convertStringToUrl(props.option?.title)}`;

  return (
    <Link to={findUrl} className="category-item">
      <div className="category-item__name">{props.option?.title}</div>
      <img
        className="category-item__icon"
        alt="Category"
        src={props.option?.icon}
      />
      <div className="category-item__reserved-item">
        {props.option?.quantity + " " + props.quantityLabel}
      </div>
    </Link>
  );
};

CategoryItem.propTypes = {
  option: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    url: PropTypes.string,
  }).isRequired,
  quantityLabel: PropTypes.string.isRequired,
};

export default CategoryItem;
