import React from "react";
import Form from "react-bootstrap/Form";
import useDataContext from "../contexts/DataContext";

export default function KeyboardListener() {
  const { inputRef, focus, handleKeyClick } = useDataContext();

  return (
    <div
      className="keyboardListener"
      style={{
        opacity: 0,
        width: 0,
        height: 0,
        position: "absolute",
        top: "-10px",
      }}
    >
      <Form.Control
        ref={inputRef}
        onBlur={focus}
        onChange={() => {
          handleKeyClick(inputRef.current.value), focus;
        }}
        onKeyDown={focus}
        key="letter-input"
        type="text"
        className="ansLetter"
        maxLength={1}
        autoComplete="off"
      />
    </div>
  );
}
