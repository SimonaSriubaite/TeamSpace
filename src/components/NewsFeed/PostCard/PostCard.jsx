import React from "react";
import PropTypes from "prop-types";
import { PostPhoto, PostVideo, LikeAndComment } from "components";
import "./PostCard.scss";

const PostCard = (props) => {
  const mainContent =
    props.postType === "video" ? (
      <PostVideo id={props.id} link={props.postVideo} />
    ) : (
      <PostPhoto link={props.postPhoto} />
    );

  return (
    <article className="post-card tiny">
      <section className="post-card__top-info">
        <figure className="post-card__circle-cropper">
          <img
            className="post-card__profile-pic"
            src={props.authorImage}
            alt={props.author}
          />
        </figure>
        <span className="post-card__author caption-uppercase">
          {props.author}
        </span>
        <span className="post-card__location">
          <b className="post-card__location post-card__location--space-between caption-uppercase">
            {props.location}
          </b>
          {props.date}
        </span>
      </section>
      <section className="post-card__main">{mainContent}</section>
      <LikeAndComment
        id={props.id}
        type="post"
        likes={props.likes}
        comments={props.comments}
        currentUser={props.currentUser}
        currentUserImage={props.currentUserImage}
        updateLayout={props.updateLayout}
      />
    </article>
  );
};

PostCard.propTypes = {
  id: PropTypes.string,
  postType: PropTypes.string,
  author: PropTypes.string,
  authorImage: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  postPhoto: PropTypes.string,
  postVideo: PropTypes.number,
  likes: PropTypes.array,
  comments: PropTypes.array,
  currentUser: PropTypes.string,
  currentUserImage: PropTypes.string,
  updateLayout: PropTypes.func,
};

export default PostCard;
