import React from "react";
import useDataContext from "../contexts/DataContext";

export default function Keyboard() {
  const {keyboard, state, handleKeyClick, alphabet } = useDataContext();

  return (
    <div className="keyboard">
      {alphabet.map((key, index) => (
        <button
          key={index}
          ref={(e)=>{keyboard.current[index] = e}}
          onClick={() => handleKeyClick(key)}
          className={`keyboard-key k-${index} ${
            state.guessed.includes(key) ? "guessed" : ""
          }`}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
