import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  LikeButton,
  CommentButton,
  CommentsSection,
} from "../../../components";
import "./LikeAndComment.scss";

const LikeAndComment = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  const { updateLayout } = props;

  useEffect(() => {
    updateLayout();
  }, [showComments, comment, updateLayout]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const sendComment = () => {
    const newCommentsArray = props.comments;

    if (comment.trim() !== "") {
      const userInfo = {
        userName: props.currentUser,
        comment: comment.trim(),
        date: new Date(),
      };
      newCommentsArray.push(userInfo);

      fetch(`${process.env.REACT_APP_DATABASE_URL}/stories/${props.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          comments: newCommentsArray,
        }),
      });
      setComment("");
    }
  };

  return (
    <div>
      <div className="likes-section">
        <LikeButton
          id={props.id}
          type={props.type}
          likes={props.likes}
          currentUser={props.currentUser}
        />
        <CommentButton
          comments={props.comments.length}
          onClick={toggleComments}
        />
      </div>
      <CommentsSection
        id={props.id}
        comments={props.comments}
        currentUser={props.currentUser}
        currentUserImage={props.currentUserImage}
        showComments={showComments}
        sendComment={sendComment}
        commentInput={comment}
        setComment={setComment}
      />
    </div>
  );
};

LikeAndComment.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  likes: PropTypes.array,
  comments: PropTypes.array,
  currentUser: PropTypes.string,
  currentUserImage: PropTypes.string,
  updateLayout: PropTypes.func,
};

export default LikeAndComment;
