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

  const { dummy_open, openDummy, dummy_task } = useContext(CalendarContext);

    const [name, setName] = useState("");
    const [color, setColor] = useState("#4caf50");
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    useEffect( () => {
        if(dummy_task) {
            setName(dummy_task.name || "");
            setColor(dummy_task.color || "#4caf50")
        }
    }, [dummy_task]);

  const closeModal = () => {
    openDummy(false);
    setError(false);
  };

  const _noDelete = () => {
      setError(true);
      setErrorText("You can not delete important tasks!");
  }

  const _noModify = () => {
      setError(true);
      setErrorText("You can not change important task!");
  }

  return (
    <Modal
      isOpen={dummy_open}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Task Form"
    >
        <div className="task-form">
            <label>Name</label>
            <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Task name"
            />
            <label>Color</label>

            <div>
            <CirclePicker
                color={color}
                onChange={(color) => {
                setColor(color.hex);
                }}
            />
            </div>
                <div>
                    <button className="button button-red" onClick={closeModal}>
                        Cancel
                    </button>
                    <button
                    className="button button-orange"
                    onClick={_noDelete}
                    >
                    Delete
                    </button>
                    <button
                    className="button button-green"
                    onClick={_noModify}
                >
                    Save
                </button>
            </div>
            {error ? <p className="error">{errorText}</p> : null}
        </div>
    </Modal>
  );
}

export default DummyForm;