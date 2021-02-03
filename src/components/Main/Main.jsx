import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Main.scss";

const Main = (props) => (
  <main className={classNames("main", `main--${props.page}`)}>
    <div className="main__content">{props.children}</div>
  </main>
);

Main.propTypes = {
  page: PropTypes.string,
  children: PropTypes.node,
};

export default Main;
