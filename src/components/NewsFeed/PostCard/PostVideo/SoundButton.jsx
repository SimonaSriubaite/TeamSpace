import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../../../../components";
import { ReactComponent as MuteIcon } from "../../../../assets/mute.svg";
import { ReactComponent as UnmuteIcon } from "../../../../assets/unmute.svg";

const SoundButton = (props) => {
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const video = document.getElementById(props.id);

  const buttonIcon = () => {
    return isVideoMuted ? <MuteIcon /> : <UnmuteIcon />;
  };

  const handleSound = () => {
    video.muted = !video.muted;
    setIsVideoMuted(!isVideoMuted);
  };

  return (
    <div>
      {props.isVideoPlaying && (
        <Button type="sound" onClick={handleSound}>
          {buttonIcon()}
        </Button>
      )}
    </div>
  );
};

SoundButton.propTypes = {
  id: PropTypes.string,
  isVideoPlaying: PropTypes.bool,
};

export default SoundButton;
