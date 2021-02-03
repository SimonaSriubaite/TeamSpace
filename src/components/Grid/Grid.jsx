import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Grid.scss";

const Grid = (props) => (
  <div className={classNames("grid", `grid--columns-${props.columnCount}`)}>
    {props.children}
  </div>
);

Grid.propTypes = {
  columnCount: PropTypes.number,
  children: PropTypes.node,
};

export default Grid;
