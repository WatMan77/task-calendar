import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { CalendarContext } from "../context/CalendarContext";
import { CirclePicker } from "react-color";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function DummyForm() {

  const { dummy_open, openDummy } = useContext(CalendarContext);

  const closeModal = () => {
    openDummy(false);
  };

  return (
    <Modal
      isOpen={dummy_open}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Task Form"
    >
      <button className="button button-red" onClick={closeModal}>
            Cancel
        </button>
    </Modal>
  );
}

export default DummyForm;