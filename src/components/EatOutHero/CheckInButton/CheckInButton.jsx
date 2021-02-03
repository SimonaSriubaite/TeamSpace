import React from "react";
import PropTypes from "prop-types";
import { Button } from "components";
import classNames from "classnames";
import "./CheckInButton.scss";

const CheckInButton = (props) => {
  return (
    <Button
      onClick={props.toggleCheckIn}
      buttonClassNames={classNames("check-in-button", {
        "check-in-button--checked": props.isChecked,
      })}
      type="large"
    >
      {props.isChecked ? "check-out" : "check-in"}
    </Button>
  );
};

CheckInButton.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  likes: PropTypes.array,
  currentUser: PropTypes.string,
  checkIns: PropTypes.array,
  toggleCheckIn: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default CheckInButton;
