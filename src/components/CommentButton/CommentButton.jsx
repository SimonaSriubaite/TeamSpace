import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../components";
import { ReactComponent as CommentsIcon } from "../../assets/comments.svg";
import "./CommentButton.scss";

const CommentButton = (props) => {
  return (
    <div className="comments">
      <Button type="like-comment" onClick={props.onClick}>
        <CommentsIcon />
      </Button>
      {props.comments}
    </div>
  );
};

CommentButton.propTypes = {
  comments: PropTypes.number,
  onClick: PropTypes.func,
};

export default CommentButton;
