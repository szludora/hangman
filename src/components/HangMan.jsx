import React from "react";
import useDataContext from "../contexts/DataContext";

export default function HangMan() {
  const { images, state } = useDataContext();

  return (
    <div className="hangman">
      <img
        src={images[state.mistake]}
        alt={`Hangman stage ${state.mistake}`}
      />
    </div>
  );
}
