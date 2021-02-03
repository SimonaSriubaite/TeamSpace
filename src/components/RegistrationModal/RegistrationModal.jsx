import React from "react";
import PropTypes from "prop-types";
import "./RegistrationModal.scss";
import { Button, Modal } from "components";
import { useHistory } from "react-router-dom";

const RegistrationModal = (props) => {
  const history = useHistory();

  const buttonHandler = () => {
    history.push("/login", { from: "/registration" });
  };

  return (
    <Modal
      showModal={props.showModal}
      setShowModal={props.setShowModal}
      title={"Registration complete!"}
    >
      <Button type="large" onClick={buttonHandler}>
        Login
      </Button>
    </Modal>
  );
};

RegistrationModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default RegistrationModal;
