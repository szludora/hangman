import React from "react";
import useDataContext from "../contexts/DataContext";

export default function Keyboard() {
  const { guessed, handleKeyClick, alphabet } = useDataContext();

  return (
    <div className="keyboard">
      {alphabet.map((key, index) => (
        <button
          key={index}
          onClick={() => handleKeyClick(key)}
          className={`keyboard-key k-${index} ${
            guessed.includes(key) ? "guessed" : ""
          }`}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
