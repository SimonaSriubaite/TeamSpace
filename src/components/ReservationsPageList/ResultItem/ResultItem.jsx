import React from "react";
import PropTypes from "prop-types";
import "./ResultItem.scss";

const ResultItem = (props) => {
  return (
    <div className="result">
      <img className="result__icon" alt="Category" src={props.option?.image} />
      <div className="result__info">
        <div className="result__header">{props.option?.header}</div>
        <div className="result__title">{props.option?.title}</div>
        <div className="result__available">
          <img
            className="result__available-icon"
            alt="Item"
            src={props.option?.availableIcon}
          />
          {props.option?.available}
        </div>
        <div className="result__footer">{props.option?.footer}</div>
      </div>
      <div className="result__categories">
        <img
          className="result__heart-icon"
          alt="Like"
          src={props.option?.heartIcon}
        />

        <div className="result__button-wrapper">
          <button className="result__button">VIEW MORE</button>
          <button className="result__button result__button--colorful">
            BOOK
          </button>
        </div>
      </div>
    </div>
  );
};

ResultItem.propTypes = {
  option: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    header: PropTypes.string,
    availableIcon: PropTypes.string,
    heartIcon: PropTypes.string,
    available: PropTypes.string,
    footer: PropTypes.element,
  }).isRequired,
};

export default ResultItem;
