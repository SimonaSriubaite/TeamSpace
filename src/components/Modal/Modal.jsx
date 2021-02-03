import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./Modal.scss";
import { Button } from "components";
import { ReactComponent as XMark } from "../../assets/x_mark.svg";

const Modal = ({ children, title, showModal, setShowModal }) => {
  const content = showModal && (
    <div className="overlay">
      <div className="modal">
        <header className="modal__header">
          <h3 className="h3">{title}</h3>
          <Button type="float" onClick={() => setShowModal(false)}>
            <XMark />
          </Button>
        </header>
        <section className="modal__body">{children}</section>
      </div>
    </div>
  );
  return createPortal(content, document.body);
};

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default Modal;
