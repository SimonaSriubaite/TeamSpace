import React from "react";
import PropTypes from "prop-types";
import { LikeAndComment } from "../../../components";
import { getBirthdayDate } from "../../../utils/getBirthdayDate.js";
import "./BirthdayCard.scss";

const BirthdayCard = (props) => {
  return (
    <article className="birthday-card tiny">
      <figure className="birthday-card__circle-cropper">
        <img
          className="birthday-card__profile-pic"
          src={props.authorImage}
          alt={props.author}
        />
      </figure>
      <section className="birthday-card__feed-card-style">
        <header className="birthday-card__main">
          <h4 className="birthday-card__caption caption-uppercase">
            {props.author}
          </h4>
          <p>
            Celebrated a birthday on&nbsp;
            <b>
              {getBirthdayDate(props.birthday)}
              <br />
              Send a wish!
            </b>
          </p>
        </header>
        <LikeAndComment
          id={props.id}
          type="birthday"
          likes={props.likes}
          comments={props.comments}
          currentUser={props.currentUser}
          currentUserImage={props.currentUserImage}
          updateLayout={props.updateLayout}
        />
      </section>
    </article>
  );
};

BirthdayCard.propTypes = {
  id: PropTypes.string,
  author: PropTypes.string,
  authorImage: PropTypes.string,
  birthday: PropTypes.string,
  likes: PropTypes.array,
  comments: PropTypes.array,
  currentUser: PropTypes.string,
  currentUserImage: PropTypes.string,
  updateLayout: PropTypes.func,
};

export default BirthdayCard;
