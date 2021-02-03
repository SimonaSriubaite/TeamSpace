import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "../../components";
import { ReactComponent as Icon404 } from "../../assets/404-page.svg";
import "./ErrorHandler.scss";

const ErrorHandler = (props) => (
  <div className="error-message">
    <Icon404 className="error-message__image" />
    <h1>Sorry!</h1>
    <h5 className="error-message__message">{props.children}</h5>
    {props.buttonText && (
      <Link to={props.buttonLink} className="error-message__button">
        <Button type="medium" buttonClassNames="button--centered">
          {props.buttonText}
        </Button>
      </Link>
    )}
  </div>
);

ErrorHandler.propTypes = {
  children: PropTypes.node,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
};
export default ErrorHandler;
