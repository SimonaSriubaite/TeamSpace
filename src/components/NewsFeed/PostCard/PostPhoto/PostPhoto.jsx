import React from "react";
import PropTypes from "prop-types";
import "./PostPhoto.scss";

const PostPhoto = (props) => {
  return (
    <figure className="photo-container">
      <img className="photo-container__photo" src={props.link} alt="" />
    </figure>
  );
};

PostPhoto.propTypes = {
  link: PropTypes.string,
};

export default PostPhoto;
