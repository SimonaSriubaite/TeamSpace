import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../../../components";
import "./CommentsSection.scss";

const CommentsSection = (props) => {
  const textarea = document.getElementsByClassName("write-comment__textarea");
  for (let i = 0; i < textarea.length; i++) {
    textarea[i].setAttribute(
      "style",
      "height:" + textarea[i].scrollHeight + "px;"
    );
    textarea[i].addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight / 2 + "px";
  }

  function sendCommentUpdateTeaxtarea(event) {
    event.preventDefault();
    props.sendComment();
  }

  if (!props.showComments) {
    return null;
  }

  return (
    <section className="comments-section">
      {props.comments.map((comment, index) => (
        <div key={index} className="comments-section__separate-comment">
          <span className="comments-section__comment-author tiny-uppercase">
            {comment.userName}
          </span>
          <span className="comments-section__comment-text">
            {comment.comment}
          </span>
        </div>
      ))}
      <div className="write-comment">
        <div className="write-comment__circle-cropper">
          <img
            className="write-comment__profile-pic"
            src={props.currentUserImage}
            alt="avatar"
          />
        </div>
        <form
          className="write-comment__comment-form"
          onSubmit={sendCommentUpdateTeaxtarea}
        >
          <textarea
            id="comment"
            value={props.commentInput}
            type="text"
            className="write-comment__textarea"
            placeholder="Leave a comment..."
            onChange={(e) => props.setComment(e.target.value)}
          />
          <Button type="text">Post</Button>
        </form>
      </div>
    </section>
  );
};

CommentsSection.propTypes = {
  id: PropTypes.string,
  comments: PropTypes.array,
  currentUser: PropTypes.string,
  currentUserImage: PropTypes.string,
  showComments: PropTypes.bool,
  sendComment: PropTypes.func,
  commentInput: PropTypes.string,
  setComment: PropTypes.func,
};

export default CommentsSection;
