import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Categories.scss";
import CategoryItem from "./Components/CategoryItem";

const Categories = (props) => {
  return (
    <div className="categories">
      <h2
        className={classNames("h3", {
          "h2-alt": props.title === "Reservations",
        })}
      >
        {props.title}
      </h2>
      <div className="categories__wrapper">
        {props.data.map((option, index) => {
          return (
            <CategoryItem
              key={index}
              option={option}
              quantityLabel={props.quantityLabel}
            />
          );
        })}
      </div>
    </div>
  );
};

Categories.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  quantityLabel: PropTypes.string.isRequired,
};

export default Categories;
