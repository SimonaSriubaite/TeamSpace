import React, { useState } from "react";
import PropTypes from "prop-types";
import { SoundButton } from "../../../../components";
import video1 from "../../../../assets/video/video-cooking.mp4";
import video2 from "../../../../assets/video/video-plane.mp4";
import video3 from "../../../../assets/video/video-sleeping-cat.mp4";
import { ReactComponent as PlayOverlay } from "../../../../assets/play.svg";
import "./PostVideo.scss";

const PostVideo = (props) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoArr = [video1, video2, video3];
  const video = document.getElementById(props.id);

  let playButtonId = `button-${props.id}`;
  const playButton = document.getElementById(playButtonId);

  const handlePlay = () => {
    if (video.paused) {
      video.play();
      setIsVideoPlaying(true);
      playButton.setAttribute("style", "opacity:0; transform:scale(1.1);");
      return;
    }
    video.pause();
    setIsVideoPlaying(false);
    playButton.setAttribute("style", "opacity:1;");
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    playButton.setAttribute("style", "opacity:1;");
  };

  return (
    <div className="video-player">
      <button className="video-container" onClick={handlePlay}>
        <video
          className="video-container__video"
          id={props.id}
          onEnded={handleVideoEnd}
        >
          <source src={videoArr[props.link]} type="video/mp4" />
          <track kind="captions" src="" />
          Your browser does not support this video.
        </video>
        <div className="video-container__play-overlay" id={playButtonId}>
          <PlayOverlay />
        </div>
      </button>
      <div className="sound-button">
        <SoundButton id={props.id} isVideoPlaying={isVideoPlaying} />
      </div>
    </div>
  );
};

PostVideo.propTypes = {
  id: PropTypes.string,
  link: PropTypes.number,
};

export default PostVideo;
