import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "components";
import classNames from "classnames";
import "./CheckInButton.scss";

const CheckInButton = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [CheckInArray, setCheckInArray] = useState([]);
  const [dbUpdate, setDbUpdate] = useState(0);

  const updateDB = (arr) => {
    fetch(
      `${process.env.REACT_APP_DATABASE_URL}/restaurantList/${props.restaurantId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          checkIns: arr,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => res.json())
      .then(() => {
        setDbUpdate(dbUpdate + 1);
      })
      .catch(() => {
        alert("Ups! Something went wrong, try again");
      });
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_DATABASE_URL}/restaurantList/${props.restaurantId}`
    )
      .then((res) => res.json())
      .then((res) => {
        setCheckInArray(res.checkIns);
        setIsChecked(res.checkIns.includes(props.currentUser));
      })
      .catch((error) => {});
  }, [props.restaurantId, props.currentUser, dbUpdate]);

  const toggleCheckIn = () => {
    if (!isChecked) {
      updateDB([...CheckInArray, props.currentUser]);
    } else {
      const unCheckedArray = [...CheckInArray];
      const indexToRemove = unCheckedArray.indexOf(props.currentUser);
      unCheckedArray.splice(indexToRemove, 1);
      updateDB(unCheckedArray);
    }
  };

  return (
    <Button
      onClick={toggleCheckIn}
      buttonClassNames={classNames("check-in-button", {
        "check-in-button--checked": isChecked,
      })}
      type="medium"
    >
      {isChecked ? "check-out" : "check-in"}
    </Button>
  );
};

CheckInButton.propTypes = {
  restaurantId: PropTypes.string,
  currentUser: PropTypes.string,
};

export default CheckInButton;
