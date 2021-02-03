import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as LeftPointer } from "../../../assets/leftpointer.svg";
import { ReactComponent as RightPointer } from "../../../assets/rightpointer.svg";
import "./Pagination.scss";

const Pagination = (props) => {
  return (
    <div className="pagination-wrapper">
      <button className="pagination-wrapper__button">
        <LeftPointer />
      </button>
      <button className="pagination-wrapper__button">1</button>
      <button className="pagination-wrapper__button wrapper__button--colorful">
        2
      </button>
      <button className="pagination-wrapper__button">...</button>
      <button className="pagination-wrapper__button">{props.length}</button>
      <button className="pagination-wrapper__button">
        <RightPointer />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  length: PropTypes.number,
};

export default Pagination;
