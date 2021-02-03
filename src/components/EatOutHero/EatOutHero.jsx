import React, { useEffect, useState } from "react";
import { LikeButton, RatingLabel } from "components";
import PropTypes from "prop-types";
import CheckInButton from "./CheckInButton/CheckInButton";
import "./EatOutHero.scss";

const EatOutHero = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [CheckInArray, setCheckInArray] = useState([]);
  const [dbUpdate, setDbUpdate] = useState(0);

  const updateDB = (arr) => {
    fetch(`${process.env.REACT_APP_DATABASE_URL}/restaurantList/${props.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        checkIns: arr,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setDbUpdate(dbUpdate + 1);
      })
      .catch(() => {
        alert("Ups! Something went wrong, try again");
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATABASE_URL}/restaurantList/${props.id}`)
      .then((res) => res.json())
      .then((res) => {
        setCheckInArray(res.checkIns);
        setIsChecked(res.checkIns.includes(props.currentUser));
      })
      .catch((error) => {});
  }, [props.id, props.currentUser, dbUpdate]);

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
    <div className="hero">
      <figure className="hero__figure">
        <img
          className="hero__figure-img"
          src={props.imageUrl}
          alt={props.name}
        />
      </figure>
      <div className="hero__container">
        <div className="hero__container--inner">
          <div className="hero__banner-wrapper">
            <div className="hero__categories">
              {props.categories &&
                props.categories.map((category, index) => {
                  return (
                    <div
                      className="hero__categories-item"
                      key={index}
                      type="category"
                    >
                      {category}
                    </div>
                  );
                })}
            </div>
            <h1 className="hero__title">{props.name}</h1>
          </div>
        </div>
        <div className="hero__interactions">
          <div className="hero__interactions-container">
            <RatingLabel
              restaurantName={props.name}
              restaurantId={props.id}
              rating={props.restaurantRating}
              currentUser={props.currentUser}
            />
            {props.likes && (
              <LikeButton
                id={props.id}
                type="restaurant"
                likes={props.likes}
                currentUser={props.currentUser}
              />
            )}
          </div>
          <span className="hero__interactions--span">
            {CheckInArray.length} people already checked-in!
          </span>
          <div className="hero__interactions-container">
            <span className="hero__interactions-container--span">invite</span>
            <CheckInButton
              id={props.id}
              checkIns={CheckInArray}
              currentUser={props.currentUser}
              isChecked={isChecked}
              toggleCheckIn={toggleCheckIn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

EatOutHero.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  categories: PropTypes.array,
  restaurantRating: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  likes: PropTypes.array,
  currentUser: PropTypes.string,
};

export default EatOutHero;
