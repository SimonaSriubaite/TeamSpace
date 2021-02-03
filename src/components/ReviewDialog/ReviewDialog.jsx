import React, { useState } from "react";
import PropTypes, { number } from "prop-types";
import "./ReviewDialog.scss";
import { Button, Modal } from "components";
import { updateRestaurantRating } from "../../utils/updateRestaurantRating.js";

const ReviewDialog = (props) => {
  const [reviewText, setReviewText] = useState("");
  const [status, setStatus] = useState("");
  const saveReview = () => {
    setStatus("loading");
    fetch(`${process.env.REACT_APP_DATABASE_URL}/restaurantReviews`, {
      method: "POST",
      body: JSON.stringify({
        userName: props.currentUser,
        comment: reviewText,
        rating: props.selectedRating,
        restaurantId: props.restaurantId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setStatus("completed");
        updateRestaurantRating(props.restaurantId);
      })
      .catch(() => {
        setStatus("error");
      });
  };

  const dynamicContent = () => {
    let content;
    switch (status) {
      case "loading":
        content = (
          <h4 className="h4-alt">
            Your reivew is being uploaded. Please wait!
          </h4>
        );
        break;
      case "error":
        content = (
          <div className="review">
            <h4 className="h4-alt">
              Ooops! something went wrong. Please close the window and try
              again!
            </h4>
          </div>
        );
        break;
      case "completed":
        content = (
          <div className="review">
            <h4 className="h4-alt">
              Thank you for your review! This window will close now...
            </h4>
          </div>
        );
        setTimeout(() => {
          props.setShowModal(false);
        }, 2000);
        break;
      default:
        content = (
          <div className="review">
            <p className="body">Your review vote: {props.selectedRating} / 5</p>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={5}
              placeholder="Write little something about the place..."
              className="review__textarea"
            />
            <p className="tiny">Reviewing as: {props.currentUser}</p>
            <Button
              type="medium"
              onClick={saveReview.bind(null, props.restaurantId)}
            >
              Submit review
            </Button>
          </div>
        );
    }
    return content;
  };

  return (
    <Modal
      showModal={props.showModal}
      setShowModal={props.setShowModal}
      title={`Leave a review for ${props.restaurantName}`}
    >
      {dynamicContent()}
    </Modal>
  );
};

ReviewDialog.propTypes = {
  selectedRating: number,
  restaurantName: PropTypes.string,
  restaurantId: PropTypes.string,
  currentUser: PropTypes.string,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default ReviewDialog;
