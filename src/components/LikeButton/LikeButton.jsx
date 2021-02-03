import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button } from "../../components";
import { ReactComponent as WishesIcon } from "../../assets/birthday-card-wishes.svg";
import { ReactComponent as HeartIcon } from "../../assets/heart.svg";
import "./LikeButton.scss";

const LikeButton = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesArray, setLikesArray] = useState(props.likes);

  useEffect(() => {
    // Add a new case for your button type below
    switch (props.type) {
      case "birthday":
        fetch(`${process.env.REACT_APP_DATABASE_URL}/stories/${props.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            wishes: likesArray,
          }),
        });
        break;
      case "post":
        fetch(`${process.env.REACT_APP_DATABASE_URL}/stories/${props.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            likes: likesArray,
          }),
        });
        break;

      case "restaurant":
        fetch(
          `${process.env.REACT_APP_DATABASE_URL}/restaurantList/${props.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              likes: likesArray,
            }),
          }
        );
        break;
      default:
        break;
    }

    if (likesArray.includes(props.currentUser)) {
      setIsLiked(true);
    }
  }, [likesArray, props]);

  const toggleLike = () => {
    if (!isLiked) {
      setLikesArray((likesArray) => [...likesArray, props.currentUser]);
    } else {
      const unlikedArray = [...likesArray];
      const indexToRemove = unlikedArray.indexOf(props.currentUser);
      unlikedArray.splice(indexToRemove, 1);
      setLikesArray(unlikedArray);
      setIsLiked(false);
    }
  };

  const chooseIcon = () => {
    return props.type === "birthday" ? (
      <WishesIcon
        className={classNames({
          "likes__wished-icon": isLiked,
        })}
      />
    ) : (
      <HeartIcon
        className={classNames("likes-iconBigger", {
          "likes__liked-icon": isLiked,
        })}
      />
    );
  };

  return (
    <div
      className={classNames("likes", {
        "likes--restaurant": props.type === "restaurant",
      })}
    >
      <Button type="like-comment" onClick={toggleLike}>
        {chooseIcon()}
      </Button>
      {props.type !== "restaurant" && (
        <div className="like-text">{likesArray.length}</div>
      )}
    </div>
  );
};

LikeButton.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  likes: PropTypes.array,
  currentUser: PropTypes.string,
};

export default LikeButton;
